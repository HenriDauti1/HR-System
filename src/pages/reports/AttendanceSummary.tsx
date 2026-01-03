import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DataTable, type Column } from '@/components/common/DataTable';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { mockDataService } from '@/services/mockDataService';
import type { AttendanceSummaryDto } from '@/types';
import { Clock, AlertTriangle, TrendingUp } from 'lucide-react';

const AttendanceSummary: React.FC = () => {
  const [data, setData] = useState<AttendanceSummaryDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await mockDataService.getAttendanceSummary();
        setData(result);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns: Column<AttendanceSummaryDto>[] = [
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
      key: 'daysWorked',
      header: 'Days Worked',
      sortable: true,
      accessor: row => (
        <span className="font-semibold text-primary">{row.daysWorked}</span>
      ),
    },
    {
      key: 'totalHoursWorked',
      header: 'Total Hours',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>{row.totalHoursWorked.toFixed(1)}h</span>
        </div>
      ),
    },
    {
      key: 'avgHoursPerDay',
      header: 'Avg/Day',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-success" />
          <span>{row.avgHoursPerDay}h</span>
        </div>
      ),
    },
    {
      key: 'lateArrivals',
      header: 'Late Arrivals',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2">
          {row.lateArrivals > 3 ? (
            <AlertTriangle className="w-4 h-4 text-warning" />
          ) : null}
          <span className={row.lateArrivals > 3 ? 'text-warning font-medium' : ''}>
            {row.lateArrivals}
          </span>
        </div>
      ),
    },
    {
      key: 'overtimeHours',
      header: 'Overtime',
      sortable: true,
      accessor: row => (
        <span className={row.overtimeHours > 10 ? 'text-info font-medium' : ''}>
          {row.overtimeHours.toFixed(1)}h
        </span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Layout>
        <PageLoader message="Loading attendance summary..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Attendance Summary</h1>
            <p className="text-muted-foreground">
              Monthly attendance report for {data.length} employees
            </p>
          </div>
        </div>

        <DataTable
          data={data}
          columns={columns}
          searchPlaceholder="Search employees..."
          searchKeys={['fullName', 'departmentName', 'positionName'] as (keyof AttendanceSummaryDto)[]}
          emptyMessage="No attendance records found"
        />
      </div>
    </Layout>
  );
};

export default AttendanceSummary;
