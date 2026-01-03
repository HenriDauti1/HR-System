import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DataTable, type Column } from '@/components/common/DataTable';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { mockDataService } from '@/services/mockDataService';
import type { DepartmentStatisticsDto } from '@/types';
import { Building2, Users, TrendingUp } from 'lucide-react';

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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{row.departmentName}</p>
            <p className="text-xs text-muted-foreground">{row.countryName}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'regionName',
      header: 'Region',
      sortable: true,
      accessor: row => row.regionName,
    },
    {
      key: 'totalEmployees',
      header: 'Total Employees',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="font-semibold">{row.totalEmployees}</span>
        </div>
      ),
    },
    {
      key: 'maleCount',
      header: 'Gender Distribution',
      accessor: row => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-full max-w-32 bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${row.malePercentage}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Male: {row.maleCount} ({row.malePercentage}%)</span>
            <span>Female: {row.femaleCount} ({row.femalePercentage}%)</span>
          </div>
        </div>
      ),
    },
    {
      key: 'avgYearsService',
      header: 'Avg. Service',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-success" />
          <span>{row.avgYearsService} years</span>
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
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Department Statistics</h1>
            <p className="text-muted-foreground">
              Overview of {data.length} departments across all regions
            </p>
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
