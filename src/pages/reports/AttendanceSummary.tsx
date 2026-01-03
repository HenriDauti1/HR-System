import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DataTable, type Column } from '@/components/common/DataTable';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { mockDataService } from '@/services/mockDataService';
import type { AttendanceSummaryDto } from '@/types';
import { Clock, AlertTriangle, TrendingUp, Sparkles, Zap } from 'lucide-react';

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
      key: 'daysWorked',
      header: 'Days Worked',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
          <span className="text-2xl font-bold text-primary">{row.daysWorked}</span>
          <span className="text-xs text-muted-foreground font-medium">days</span>
        </div>
      ),
    },
    {
      key: 'totalHoursWorked',
      header: 'Total Hours',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-success/5 border border-success/10">
          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
            <Clock className="w-4 h-4 text-success" />
          </div>
          <div>
            <span className="font-bold text-lg text-success">{row.totalHoursWorked.toFixed(1)}</span>
            <span className="text-xs text-success/70 ml-1">hours</span>
          </div>
        </div>
      ),
    },
    {
      key: 'avgHoursPerDay',
      header: 'Avg/Day',
      sortable: true,
      accessor: row => (
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-info/5 border border-info/10">
          <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-info" />
          </div>
          <span className="font-bold text-info">{row.avgHoursPerDay}h</span>
        </div>
      ),
    },
    {
      key: 'lateArrivals',
      header: 'Late Arrivals',
      sortable: true,
      accessor: row => (
        <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg ${
          row.lateArrivals > 3 
            ? 'bg-warning/10 border-warning/20' 
            : 'bg-muted/30 border-border/30'
        } border`}>
          {row.lateArrivals > 3 && (
            <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-4 h-4 text-warning" />
            </div>
          )}
          <span className={`font-bold text-lg ${
            row.lateArrivals > 3 ? 'text-warning' : 'text-muted-foreground'
          }`}>
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
        <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg ${
          row.overtimeHours > 10 
            ? 'bg-accent/10 border-accent/20' 
            : 'bg-muted/30 border-border/30'
        } border`}>
          {row.overtimeHours > 10 && (
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-accent" />
            </div>
          )}
          <span className={`font-bold ${
            row.overtimeHours > 10 ? 'text-accent' : 'text-muted-foreground'
          }`}>
            {row.overtimeHours.toFixed(1)}h
          </span>
        </div>
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
        <div className="relative overflow-hidden rounded-2xl bg-gradient-hero border border-border/50 p-6 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-success/5 rounded-full blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-2xl animate-pulse" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <Clock className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-foreground">Attendance Summary</h1>
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              </div>
              <p className="text-muted-foreground font-medium">
                Monthly attendance report for <span className="text-primary font-bold text-lg">{data.length}</span> employees
              </p>
            </div>
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