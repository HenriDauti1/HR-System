import React, { useState, useEffect, useCallback } from 'react';
import { CrudPage, FieldConfig, ColumnConfig } from '@/components/admin/CrudPage';
import { mockDataService } from '@/services/mockDataService';
import type { Attendance, Employee } from '@/types';

const AttendanceManagement: React.FC = () => {
  const [data, setData] = useState<Attendance[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [attendance, emps] = await Promise.all([
        mockDataService.getAttendance(),
        mockDataService.getEmployees(),
      ]);
      setData(attendance);
      setEmployees(emps);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const columns: ColumnConfig<Attendance>[] = [
    { key: 'employeeName', label: 'Employee' },
    { key: 'attendanceDate', label: 'Date' },
    {
      key: 'checkIn',
      label: 'Check In',
      render: (item) => item.checkIn ? new Date(item.checkIn).toLocaleTimeString() : '-',
    },
    {
      key: 'checkOut',
      label: 'Check Out',
      render: (item) => item.checkOut ? new Date(item.checkOut).toLocaleTimeString() : '-',
    },
    {
      key: 'hours',
      label: 'Hours',
      render: (item) => {
        if (item.checkIn && item.checkOut) {
          const hours = (new Date(item.checkOut).getTime() - new Date(item.checkIn).getTime()) / (1000 * 60 * 60);
          return hours.toFixed(2);
        }
        return '-';
      },
    },
  ];

  const fields: FieldConfig[] = [
    {
      name: 'employeeId',
      label: 'Employee',
      type: 'select',
      required: true,
      options: employees.map(e => ({ value: e.employeeId, label: `${e.firstName} ${e.lastName}` })),
    },
    { name: 'attendanceDate', label: 'Date', type: 'date', required: true },
    { name: 'checkIn', label: 'Check In', type: 'datetime' },
    { name: 'checkOut', label: 'Check Out', type: 'datetime' },
  ];

  const handleCreate = async (formData: Partial<Attendance>) => {
    await mockDataService.createAttendance(formData);
    await loadData();
  };

  const handleUpdate = async (id: string, formData: Partial<Attendance>) => {
    await mockDataService.updateAttendance(id, formData);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await mockDataService.deleteAttendance(id);
    await loadData();
  };

  return (
    <CrudPage
      title="Attendance"
      description="Manage employee attendance records"
      data={data}
      columns={columns}
      fields={fields}
      idField="attendanceId"
      isLoading={isLoading}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      searchPlaceholder="Search attendance..."
    />
  );
};

export default AttendanceManagement;
