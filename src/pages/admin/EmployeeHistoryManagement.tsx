import React, { useState, useEffect, useCallback } from 'react';
import { CrudPage, FieldConfig, ColumnConfig } from '@/components/admin/CrudPage';
import { mockDataService } from '@/services/mockDataService';
import type { EmployeeHistory, Employee, Department, Position } from '@/types';

const EmployeeHistoryManagement: React.FC = () => {
  const [data, setData] = useState<EmployeeHistory[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [history, emps, depts, pos] = await Promise.all([
        mockDataService.getEmployeeHistory(),
        mockDataService.getEmployees(),
        mockDataService.getDepartments(),
        mockDataService.getPositions(),
      ]);
      setData(history);
      setEmployees(emps);
      setDepartments(depts);
      setPositions(pos);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const columns: ColumnConfig<EmployeeHistory>[] = [
    { key: 'employeeName', label: 'Employee' },
    { key: 'departmentName', label: 'Department' },
    { key: 'positionName', label: 'Position' },
    { key: 'validFrom', label: 'Valid From' },
    {
      key: 'validTo',
      label: 'Valid To',
      render: (item) => item.validTo || 'Current',
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
      name: 'departmentId',
      label: 'Department',
      type: 'select',
      required: true,
      options: departments.map(d => ({ value: d.departmentId, label: d.departmentName })),
    },
    {
      name: 'positionId',
      label: 'Position',
      type: 'select',
      required: true,
      options: positions.map(p => ({ value: p.positionId, label: p.positionName })),
    },
    { name: 'validFrom', label: 'Valid From', type: 'date', required: true },
    { name: 'validTo', label: 'Valid To', type: 'date' },
  ];

  const handleCreate = async (formData: Partial<EmployeeHistory>) => {
    await mockDataService.createEmployeeHistory(formData);
    await loadData();
  };

  const handleUpdate = async (id: string, formData: Partial<EmployeeHistory>) => {
    await mockDataService.updateEmployeeHistory(id, formData);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await mockDataService.deleteEmployeeHistory(id);
    await loadData();
  };

  return (
    <CrudPage
      title="Employee History"
      description="Manage employee department and position history"
      data={data}
      columns={columns}
      fields={fields}
      idField="employeeHistoryId"
      isLoading={isLoading}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      searchPlaceholder="Search history..."
    />
  );
};

export default EmployeeHistoryManagement;
