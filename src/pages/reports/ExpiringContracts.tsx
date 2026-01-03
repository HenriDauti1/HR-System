import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DataTable, type Column } from '@/components/common/DataTable';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { AutoStatusBadge } from '@/components/common/StatusBadge';
import { mockDataService } from '@/services/mockDataService';
import { type ExpiringContractDto } from '@/types';
import { FileText, AlertTriangle, DollarSign, Calendar, Sparkles, CheckCircle } from 'lucide-react';

const ExpiringContracts: React.FC = () => {
  const [data, setData] = useState<ExpiringContractDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await mockDataService.getExpiringContracts();
        setData(result);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns: Column<ExpiringContractDto>[] = [
    {
      key: 'fullName',
      header: 'Employee',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-warning/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-warning to-warning/70 flex items-center justify-center shadow-md ring-2 ring-warning/30 transition-all duration-300 group-hover:ring-4 group-hover:scale-105">
              <span className="text-sm font-bold text-white">
                {row.fullName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
          <div>
            <p className="font-semibold text-foreground group-hover:text-warning transition-colors">{row.fullName}</p>
            <p className="text-xs text-muted-foreground font-medium">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'departmentName',
      header: 'Department',
      sortable: true,
      accessor: row => (
        <div>
          <p className="text-sm font-semibold text-foreground">{row.departmentName}</p>
          <p className="text-xs text-muted-foreground font-medium">{row.positionName}</p>
        </div>
      ),
    },
    {
      key: 'contractType',
      header: 'Contract Type',
      sortable: true,
      accessor: row => (
        <div className="px-3 py-1.5 rounded-lg bg-gradient-hero border border-border/30 inline-block">
          <span className="capitalize font-semibold text-foreground">{row.contractType}</span>
        </div>
      ),
    },
    {
      key: 'endDate',
      header: 'Expiry Date',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-warning/5 border border-warning/20">
          <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-warning" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{new Date(row.endDate).toLocaleDateString()}</p>
            <p className="text-xs font-bold text-warning">
              {row.daysUntilExpiry} days left
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'salary',
      header: 'Salary',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-success/5 border border-success/10">
          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-success" />
          </div>
          <span className="font-bold text-success text-lg">
            ${row.salary.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      key: 'urgencyStatus',
      header: 'Status',
      sortable: true,
      accessor: row => <AutoStatusBadge status={row.urgencyStatus} />,
    },
  ];

  if (isLoading) {
    return (
      <Layout>
        <PageLoader message="Loading expiring contracts..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-hero border border-border/50 p-6 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-warning/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-warning/30 blur-xl rounded-2xl animate-pulse" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-warning to-warning/70 flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <FileText className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-foreground">Expiring Contracts</h1>
                <Sparkles className="w-5 h-5 text-warning animate-pulse" />
              </div>
              <p className="text-muted-foreground font-medium">
                <span className="text-warning font-bold text-lg">{data.length}</span> contracts expiring in the next 90 days
              </p>
            </div>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20 p-12 text-center shadow-lg">
            <div className="absolute top-0 right-0 w-48 h-48 bg-success/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-success/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">All Clear!</h3>
              <p className="text-muted-foreground font-medium text-lg">
                No contracts are expiring in the next 90 days. Everything is up to date!
              </p>
            </div>
          </div>
        ) : (
          <DataTable
            data={data}
            columns={columns}
            searchPlaceholder="Search employees..."
            searchKeys={['fullName', 'email', 'departmentName', 'positionName'] as (keyof ExpiringContractDto)[]}
            emptyMessage="No expiring contracts found"
          />
        )}
      </div>
    </Layout>
  );
};

export default ExpiringContracts;