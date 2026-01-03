import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DataTable, type Column } from '@/components/common/DataTable';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { AutoStatusBadge } from '@/components/common/StatusBadge';
import { mockDataService } from '@/services/mockDataService';
import type { LeaveBalanceDto } from '@/types';
import { Calendar, TrendingDown, CheckCircle } from 'lucide-react';

const LeaveBalance: React.FC = () => {
  const [data, setData] = useState<LeaveBalanceDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await mockDataService.getLeaveBalance();
        setData(result);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns: Column<LeaveBalanceDto>[] = [
    {
      key: 'fullName',
      header: 'Employee',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {row.fullName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-medium">{row.fullName}</p>
            <p className="text-xs text-muted-foreground">{row.positionName}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'departmentName',
      header: 'Department',
      sortable: true,
      accessor: row => row.departmentName,
    },
    {
      key: 'paidDaysUsed',
      header: 'Leave Usage',
      accessor: row => (
        <div className="space-y-1">
          <div className="flex items-center gap-4 text-xs">
            <span className="text-success">Paid: {row.paidDaysUsed}</span>
            <span className="text-warning">Sick: {row.sickDaysUsed}</span>
            <span className="text-muted-foreground">Unpaid: {row.unpaidDaysUsed}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'remainingDays',
      header: 'Remaining',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2">
          <div className="w-20 bg-muted rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                row.remainingDays < 5 ? 'bg-destructive' :
                row.remainingDays < 10 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${(row.remainingDays / row.totalAllowedDays) * 100}%` }}
            />
          </div>
          <span className="font-semibold">
            {row.remainingDays}/{row.totalAllowedDays}
          </span>
        </div>
      ),
    },
    {
      key: 'scheduledFutureDays',
      header: 'Scheduled',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-info" />
          <span>{row.scheduledFutureDays} days</span>
        </div>
      ),
    },
    {
      key: 'usagePercentage',
      header: 'Usage %',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-muted-foreground" />
          <span>{row.usagePercentage}%</span>
        </div>
      ),
    },
    {
      key: 'balanceStatus',
      header: 'Status',
      sortable: true,
      accessor: row => <AutoStatusBadge status={row.balanceStatus} />,
    },
  ];

  if (isLoading) {
    return (
      <Layout>
        <PageLoader message="Loading leave balance..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-info" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leave Balance</h1>
            <p className="text-muted-foreground">
              Leave balance overview for {data.length} employees
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-success/5 border border-success/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Good Standing</p>
                <p className="text-2xl font-bold text-success">
                  {data.filter(d => d.balanceStatus === 'OK').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-warning/5 border border-warning/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-8 h-8 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Low Balance</p>
                <p className="text-2xl font-bold text-warning">
                  {data.filter(d => d.balanceStatus.includes('LOW') || d.balanceStatus.includes('WARNING')).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-destructive">
                  {data.filter(d => d.balanceStatus.includes('OVERUSED') || d.balanceStatus.includes('DEPLETED')).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DataTable
          data={data}
          columns={columns}
          searchPlaceholder="Search employees..."
          searchKeys={['fullName', 'departmentName', 'positionName'] as (keyof LeaveBalanceDto)[]}
          emptyMessage="No leave balance records found"
        />
      </div>
    </Layout>
  );
};

export default LeaveBalance;
