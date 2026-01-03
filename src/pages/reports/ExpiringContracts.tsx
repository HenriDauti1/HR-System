import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DataTable, type Column } from '@/components/common/DataTable';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { AutoStatusBadge } from '@/components/common/StatusBadge';
import { mockDataService } from '@/services/mockDataService';
import type { ExpiringContractDto } from '@/types';
import { FileText, AlertTriangle, DollarSign, Calendar } from 'lucide-react';

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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-warning">
              {row.fullName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-medium">{row.fullName}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
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
          <p className="text-sm">{row.departmentName}</p>
          <p className="text-xs text-muted-foreground">{row.positionName}</p>
        </div>
      ),
    },
    {
      key: 'contractType',
      header: 'Contract Type',
      sortable: true,
      accessor: row => (
        <span className="capitalize font-medium">{row.contractType}</span>
      ),
    },
    {
      key: 'endDate',
      header: 'Expiry Date',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-sm">{new Date(row.endDate).toLocaleDateString()}</p>
            <p className="text-xs font-medium text-warning">
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
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-success" />
          <span className="font-medium">
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
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-warning" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Expiring Contracts</h1>
            <p className="text-muted-foreground">
              {data.length} contracts expiring in the next 90 days
            </p>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="bg-success/5 border border-success/20 rounded-xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">All Clear!</h3>
            <p className="text-muted-foreground">
              No contracts are expiring in the next 90 days.
            </p>
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
