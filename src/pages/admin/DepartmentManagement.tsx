import React, { useState, useEffect, useCallback } from 'react';
import { CrudPage, FieldConfig, ColumnConfig } from '@/components/admin/CrudPage';
import { StatusBadge } from '@/components/common/StatusBadge';
import { mockDataService } from '@/services/mockDataService';
import type { Department, Country } from '@/types';

const DepartmentManagement: React.FC = () => {
  const [data, setData] = useState<Department[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [departments, countriesData] = await Promise.all([
        mockDataService.getDepartments(),
        mockDataService.getCountries(),
      ]);
      setData(departments);
      setCountries(countriesData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const columns: ColumnConfig<Department>[] = [
    { key: 'departmentName', label: 'Department Name' },
    { key: 'countryName', label: 'Country' },
    {
      key: 'isActive',
      label: 'Status',
      render: (item) => <StatusBadge status={item.isActive ? 'Active' : 'Inactive'} />,
    },
    { key: 'createdAt', label: 'Created At' },
  ];

  const fields: FieldConfig[] = [
    { name: 'departmentName', label: 'Department Name', type: 'text', required: true, placeholder: 'Enter department name' },
    {
      name: 'countryId',
      label: 'Country',
      type: 'select',
      required: true,
      options: countries.map(c => ({ value: c.countryId, label: c.countryName })),
    },
    { name: 'isActive', label: 'Active', type: 'switch' },
  ];

  const handleCreate = async (formData: Partial<Department>) => {
    await mockDataService.createDepartment(formData);
    await loadData();
  };

  const handleUpdate = async (id: string, formData: Partial<Department>) => {
    await mockDataService.updateDepartment(id, formData);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await mockDataService.deleteDepartment(id);
    await loadData();
  };

  return (
    <CrudPage
      title="Departments"
      description="Manage departments across different countries"
      data={data}
      columns={columns}
      fields={fields}
      idField="departmentId"
      isLoading={isLoading}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      searchPlaceholder="Search departments..."
    />
  );
};

export default DepartmentManagement;
