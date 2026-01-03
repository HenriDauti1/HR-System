import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DataTable, type Column } from '@/components/common/DataTable';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { mockDataService } from '@/services/mockDataService';
import type { ActiveEmployeeDto } from '@/types';
import { Users, Mail, Phone, Building2, MapPin, TrendingUp, Sparkles } from 'lucide-react';

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
      key: 'email',
      header: 'Contact',
      accessor: row => (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mail className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-medium">{row.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span>{row.phone}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'departmentName',
      header: 'Department',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gradient-hero border border-border/30">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-foreground">{row.departmentName}</span>
        </div>
      ),
    },
    {
      key: 'countryName',
      header: 'Location',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{row.countryName}</p>
            <p className="text-xs text-muted-foreground font-medium">{row.regionName}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'hireDate',
      header: 'Service',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{new Date(row.hireDate).toLocaleDateString()}</p>
            <p className="text-xs text-success font-semibold">{row.yearsOfService} years</p>
          </div>
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
        <div className="relative overflow-hidden rounded-2xl bg-gradient-hero border border-border/50 p-6 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-2xl animate-pulse" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-foreground">Active Employees</h1>
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              </div>
              <p className="text-muted-foreground font-medium">
                <span className="text-primary font-bold text-lg">{data.length}</span> active employees across all departments
              </p>
            </div>
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