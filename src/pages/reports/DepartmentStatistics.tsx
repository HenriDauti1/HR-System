import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DataTable, type Column } from '@/components/common/DataTable';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { mockDataService } from '@/services/mockDataService';
import type { DepartmentStatisticsDto } from '@/types';
import { Building2, Users, TrendingUp, Sparkles } from 'lucide-react';

const DepartmentStatistics: React.FC = () => {
  const [data, setData] = useState<DepartmentStatisticsDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await mockDataService.getDepartmentStatistics();
        setData(result);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns: Column<DepartmentStatisticsDto>[] = [
    {
      key: 'departmentName',
      header: 'Department',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-4 group-hover:scale-105">
              <Building2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{row.departmentName}</p>
            <p className="text-xs text-muted-foreground font-medium">{row.countryName}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'regionName',
      header: 'Region',
      sortable: true,
      accessor: row => (
        <div className="px-3 py-1.5 rounded-lg bg-gradient-hero border border-border/30 inline-block">
          <span className="font-semibold text-foreground">{row.regionName}</span>
        </div>
      ),
    },
    {
      key: 'totalEmployees',
      header: 'Total Employees',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <span className="font-bold text-lg text-primary">{row.totalEmployees}</span>
        </div>
      ),
    },
    {
      key: 'maleCount',
      header: 'Gender Distribution',
      accessor: row => (
        <div className="space-y-2 min-w-[200px]">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted/50 rounded-full h-2.5 overflow-hidden border border-border/30">
              <div
                className="h-full bg-gradient-primary rounded-full shadow-sm transition-all duration-500"
                style={{ width: `${row.malePercentage}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-primary">♂ {row.maleCount} ({row.malePercentage}%)</span>
            <span className="text-accent">♀ {row.femaleCount} ({row.femalePercentage}%)</span>
          </div>
        </div>
      ),
    },
    {
      key: 'avgYearsService',
      header: 'Avg. Service',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-success/5 border border-success/10">
          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
          <span className="font-bold text-success">{row.avgYearsService} years</span>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Layout>
        <PageLoader message="Loading department statistics..." />
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
                <Building2 className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-foreground">Department Statistics</h1>
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              </div>
              <p className="text-muted-foreground font-medium">
                Overview of <span className="text-primary font-bold text-lg">{data.length}</span> departments across all regions
              </p>
            </div>
          </div>
        </div>

        <DataTable
          data={data}
          columns={columns}
          searchPlaceholder="Search departments..."
          searchKeys={['departmentName', 'countryName', 'regionName'] as (keyof DepartmentStatisticsDto)[]}
          emptyMessage="No department statistics found"
        />
      </div>
    </Layout>
  );
};

export default DepartmentStatistics;