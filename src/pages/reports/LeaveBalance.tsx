import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DataTable, type Column } from '@/components/common/DataTable';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { AutoStatusBadge } from '@/components/common/StatusBadge';
import { mockDataService } from '@/services/mockDataService';
import type { LeaveBalanceDto } from '@/types';
import { Calendar, TrendingDown, CheckCircle, AlertTriangle, XCircle, Sparkles } from 'lucide-react';

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
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center shadow-md ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-4 group-hover:scale-105">
              <span className="text-sm font-bold text-white">
                {row.fullName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
          <div>
            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{row.fullName}</p>
            <p className="text-xs text-muted-foreground font-medium">{row.positionName}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'departmentName',
      header: 'Department',
      sortable: true,
      accessor: row => (
        <div className="px-3 py-1.5 rounded-lg bg-gradient-hero border border-border/30 inline-block">
          <span className="font-semibold text-foreground">{row.departmentName}</span>
        </div>
      ),
    },
    {
      key: 'paidDaysUsed',
      header: 'Leave Usage',
      accessor: row => (
        <div className="space-y-1.5">
          <div className="flex items-center gap-3 text-xs font-semibold">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-success/10 border border-success/20">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-success">Paid: {row.paidDaysUsed}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-warning/10 border border-warning/20">
              <div className="w-2 h-2 rounded-full bg-warning" />
              <span className="text-warning">Sick: {row.sickDaysUsed}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50 border border-border/30">
              <div className="w-2 h-2 rounded-full bg-muted-foreground" />
              <span className="text-muted-foreground">Unpaid: {row.unpaidDaysUsed}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'remainingDays',
      header: 'Remaining',
      sortable: true,
      accessor: row => (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-24 bg-muted/50 rounded-full h-2.5 overflow-hidden border border-border/30">
              <div
                className={`h-full rounded-full shadow-sm transition-all duration-500 ${
                  row.remainingDays < 5 ? 'bg-gradient-to-r from-destructive to-destructive/80' :
                  row.remainingDays < 10 ? 'bg-gradient-to-r from-warning to-warning/80' : 
                  'bg-gradient-primary'
                }`}
                style={{ width: `${(row.remainingDays / row.totalAllowedDays) * 100}%` }}
              />
            </div>
            <span className="font-bold text-lg text-foreground">
              {row.remainingDays}<span className="text-muted-foreground text-sm">/{row.totalAllowedDays}</span>
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'scheduledFutureDays',
      header: 'Scheduled',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-info/5 border border-info/10">
          <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-info" />
          </div>
          <span className="font-bold text-info">{row.scheduledFutureDays} days</span>
        </div>
      ),
    },
    {
      key: 'usagePercentage',
      header: 'Usage %',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-muted/30 border border-border/30">
          <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
            <TrendingDown className="w-4 h-4 text-muted-foreground" />
          </div>
          <span className="font-bold text-foreground">{row.usagePercentage}%</span>
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
        <div className="relative overflow-hidden rounded-2xl bg-gradient-hero border border-border/50 p-6 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-info/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-info/30 blur-xl rounded-2xl animate-pulse" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-info to-info/70 flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <Calendar className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-foreground">Leave Balance</h1>
                <Sparkles className="w-5 h-5 text-info animate-pulse" />
              </div>
              <p className="text-muted-foreground font-medium">
                Leave balance overview for <span className="text-info font-bold text-lg">{data.length}</span> employees
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20 p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-success/10 rounded-full blur-2xl" />
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-success/20 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <CheckCircle className="w-7 h-7 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-semibold mb-1">Good Standing</p>
                <p className="text-3xl font-bold text-success">
                  {data.filter(d => d.balanceStatus === 'OK').length}
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20 p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-warning/10 rounded-full blur-2xl" />
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-warning/20 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <AlertTriangle className="w-7 h-7 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-semibold mb-1">Low Balance</p>
                <p className="text-3xl font-bold text-warning">
                  {data.filter(d => d.balanceStatus.includes('LOW') || d.balanceStatus.includes('WARNING')).length}
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20 p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/10 rounded-full blur-2xl" />
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-destructive/20 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <XCircle className="w-7 h-7 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-semibold mb-1">Critical</p>
                <p className="text-3xl font-bold text-destructive">
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