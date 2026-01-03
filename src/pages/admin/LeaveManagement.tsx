import React, { useState, useEffect, useCallback } from 'react';
import { CrudPage, FieldConfig, ColumnConfig } from '@/components/admin/CrudPage';
import { StatusBadge } from '@/components/common/StatusBadge';
import { mockDataService } from '@/services/mockDataService';
import type { EmployeeLeave, Employee } from '@/types';

const LeaveManagement: React.FC = () => {
  const [data, setData] = useState<EmployeeLeave[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [leaves, emps] = await Promise.all([
        mockDataService.getLeaves(),
        mockDataService.getEmployees(),
      ]);
      setData(leaves);
      setEmployees(emps);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const columns: ColumnConfig<EmployeeLeave>[] = [
    { key: 'employeeName', label: 'Employee' },
    {
      key: 'leaveType',
      label: 'Type',
      render: (item) => (
        <StatusBadge
          status={item.leaveType}
          variant={
            item.leaveType === 'paid' ? 'success' :
            item.leaveType === 'sick' ? 'warning' : 'error'
          }
        />
      ),
    },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    {
      key: 'days',
      label: 'Days',
      render: (item) => {
        const start = new Date(item.startDate);
        const end = new Date(item.endDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        return days.toString();
      },
    },
    {
      key: 'approved',
      label: 'Status',
      render: (item) => (
        <StatusBadge
          status={item.approved ? 'Approved' : 'Pending'}
          variant={item.approved ? 'success' : 'warning'}
        />
      ),
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
    {
      name: 'leaveType',
      label: 'Leave Type',
      type: 'select',
      required: true,
      options: [
        { value: 'paid', label: 'Paid Leave' },
        { value: 'sick', label: 'Sick Leave' },
        { value: 'unpaid', label: 'Unpaid Leave' },
      ],
    },
    { name: 'startDate', label: 'Start Date', type: 'date', required: true },
    { name: 'endDate', label: 'End Date', type: 'date', required: true },
    { name: 'approved', label: 'Approved', type: 'switch' },
  ];

  const handleCreate = async (formData: Partial<EmployeeLeave>) => {
    await mockDataService.createLeave(formData);
    await loadData();
  };

  const handleUpdate = async (id: string, formData: Partial<EmployeeLeave>) => {
    await mockDataService.updateLeave(id, formData);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await mockDataService.deleteLeave(id);
    await loadData();
  };

  return (
    <CrudPage
      title="Leaves"
      description="Manage employee leave requests"
      data={data}
      columns={columns}
      fields={fields}
      idField="leaveId"
      isLoading={isLoading}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      searchPlaceholder="Search leaves..."
    />
  );
};

export default LeaveManagement;
