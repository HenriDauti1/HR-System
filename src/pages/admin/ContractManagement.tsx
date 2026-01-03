import React, { useState, useEffect, useCallback } from 'react';
import { CrudPage, FieldConfig, ColumnConfig } from '@/components/admin/CrudPage';
import { StatusBadge } from '@/components/common/StatusBadge';
import { mockDataService } from '@/services/mockDataService';
import type { Contract, Employee } from '@/types';

const ContractManagement: React.FC = () => {
  const [data, setData] = useState<Contract[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [contracts, emps] = await Promise.all([
        mockDataService.getContracts(),
        mockDataService.getEmployees(),
      ]);
      setData(contracts);
      setEmployees(emps);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const columns: ColumnConfig<Contract>[] = [
    { key: 'employeeName', label: 'Employee' },
    {
      key: 'contractType',
      label: 'Type',
      render: (item) => (
        <StatusBadge
          status={item.contractType}
          variant={
            item.contractType === 'permanent' ? 'success' :
            item.contractType === 'temporary' ? 'warning' : 'info'
          }
        />
      ),
    },
    { key: 'startDate', label: 'Start Date' },
    {
      key: 'endDate',
      label: 'End Date',
      render: (item) => item.endDate || 'No end date',
    },
    {
      key: 'salary',
      label: 'Salary',
      render: (item) => `$${item.salary.toLocaleString()}`,
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
      name: 'contractType',
      label: 'Contract Type',
      type: 'select',
      required: true,
      options: [
        { value: 'permanent', label: 'Permanent' },
        { value: 'temporary', label: 'Temporary' },
        { value: 'internship', label: 'Internship' },
      ],
    },
    { name: 'startDate', label: 'Start Date', type: 'date', required: true },
    { name: 'endDate', label: 'End Date', type: 'date' },
    { name: 'salary', label: 'Salary', type: 'number', required: true, placeholder: 'Enter salary' },
  ];

  const handleCreate = async (formData: Partial<Contract>) => {
    await mockDataService.createContract(formData);
    await loadData();
  };

  const handleUpdate = async (id: string, formData: Partial<Contract>) => {
    await mockDataService.updateContract(id, formData);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await mockDataService.deleteContract(id);
    await loadData();
  };

  return (
    <CrudPage
      title="Contracts"
      description="Manage employee contracts"
      data={data}
      columns={columns}
      fields={fields}
      idField="contractId"
      isLoading={isLoading}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      searchPlaceholder="Search contracts..."
    />
  );
};

export default ContractManagement;
