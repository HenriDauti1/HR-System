import React, { useState, useEffect, useCallback } from 'react';
import { CrudPage, FieldConfig, ColumnConfig } from '@/components/admin/CrudPage';
import { StatusBadge } from '@/components/common/StatusBadge';
import { mockDataService } from '@/services/mockDataService';
import type { Payroll, Employee } from '@/types';

const PayrollManagement: React.FC = () => {
  const [data, setData] = useState<Payroll[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [payroll, emps] = await Promise.all([
        mockDataService.getPayroll(),
        mockDataService.getEmployees(),
      ]);
      setData(payroll);
      setEmployees(emps);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const columns: ColumnConfig<Payroll>[] = [
    { key: 'employeeName', label: 'Employee' },
    { key: 'payPeriodStart', label: 'Period Start' },
    { key: 'payPeriodEnd', label: 'Period End' },
    {
      key: 'grossSalary',
      label: 'Gross',
      render: (item) => `$${item.grossSalary.toLocaleString()}`,
    },
    {
      key: 'netSalary',
      label: 'Net',
      render: (item) => `$${item.netSalary.toLocaleString()}`,
    },
    {
      key: 'paidAt',
      label: 'Status',
      render: (item) => (
        <StatusBadge
          status={item.paidAt ? 'Paid' : 'Pending'}
          variant={item.paidAt ? 'success' : 'warning'}
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
    { name: 'payPeriodStart', label: 'Period Start', type: 'date', required: true },
    { name: 'payPeriodEnd', label: 'Period End', type: 'date', required: true },
    { name: 'grossSalary', label: 'Gross Salary', type: 'number', required: true, placeholder: 'Enter gross salary' },
    { name: 'netSalary', label: 'Net Salary', type: 'number', required: true, placeholder: 'Enter net salary' },
    { name: 'paidAt', label: 'Paid At', type: 'date' },
  ];

  const handleCreate = async (formData: Partial<Payroll>) => {
    await mockDataService.createPayroll(formData);
    await loadData();
  };

  const handleUpdate = async (id: string, formData: Partial<Payroll>) => {
    await mockDataService.updatePayroll(id, formData);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await mockDataService.deletePayroll(id);
    await loadData();
  };

  return (
    <CrudPage
      title="Payroll"
      description="Manage employee payroll records"
      data={data}
      columns={columns}
      fields={fields}
      idField="payrollId"
      isLoading={isLoading}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      searchPlaceholder="Search payroll..."
    />
  );
};

export default PayrollManagement;
