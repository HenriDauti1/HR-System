import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DataTable, type Column } from '@/components/common/DataTable';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { mockDataService } from '@/services/mockDataService';
import type { ActiveEmployeeDto } from '@/types';
import { Users, Mail, Phone, Building2, MapPin } from 'lucide-react';

const ActiveEmployees: React.FC = () => {
  const [data, setData] = useState<ActiveEmployeeDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await mockDataService.getActiveEmployees();
        setData(result);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns: Column<ActiveEmployeeDto>[] = [
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
      key: 'email',
      header: 'Contact',
      accessor: row => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-3.5 h-3.5 text-muted-foreground" />
            {row.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-3.5 h-3.5" />
            {row.phone}
          </div>
        </div>
      ),
    },
    {
      key: 'departmentName',
      header: 'Department',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" />
          {row.departmentName}
        </div>
      ),
    },
    {
      key: 'countryName',
      header: 'Location',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-sm">{row.countryName}</p>
            <p className="text-xs text-muted-foreground">{row.regionName}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'hireDate',
      header: 'Hire Date',
      sortable: true,
      accessor: row => (
        <div>
          <p className="text-sm">{new Date(row.hireDate).toLocaleDateString()}</p>
          <p className="text-xs text-muted-foreground">{row.yearsOfService} years</p>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Layout>
        <PageLoader message="Loading active employees..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Active Employees</h1>
            <p className="text-muted-foreground">
              {data.length} active employees across all departments
            </p>
          </div>
        </div>

        <DataTable
          data={data}
          columns={columns}
          searchPlaceholder="Search employees..."
          searchKeys={['fullName', 'email', 'departmentName', 'positionName', 'countryName'] as (keyof ActiveEmployeeDto)[]}
          emptyMessage="No active employees found"
        />
      </div>
    </Layout>
  );
};

export default ActiveEmployees;
