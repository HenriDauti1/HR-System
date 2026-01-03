import React, { useState, useEffect, useCallback } from 'react';
import { CrudPage, FieldConfig, ColumnConfig } from '@/components/admin/CrudPage';
import { StatusBadge } from '@/components/common/StatusBadge';
import { mockDataService } from '@/services/mockDataService';
import type { Employee } from '@/types';

const columns: ColumnConfig<Employee>[] = [
  {
    key: 'fullName',
    label: 'Name',
    render: (item) => `${item.firstName} ${item.lastName}`,
  },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'nationality', label: 'Nationality' },
  { key: 'hireDate', label: 'Hire Date' },
  {
    key: 'isActive',
    label: 'Status',
    render: (item) => <StatusBadge status={item.isActive ? 'Active' : 'Inactive'} />,
  },
];

const fields: FieldConfig[] = [
  { name: 'firstName', label: 'First Name', type: 'text', required: true, placeholder: 'Enter first name' },
  { name: 'lastName', label: 'Last Name', type: 'text', required: true, placeholder: 'Enter last name' },
  { name: 'email', label: 'Email', type: 'text', required: true, placeholder: 'Enter email address' },
  { name: 'phone', label: 'Phone', type: 'text', required: true, placeholder: 'Enter phone number' },
  { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
  {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ],
  },
  { name: 'nationality', label: 'Nationality', type: 'text', required: true, placeholder: 'Enter nationality' },
  { name: 'addressLine1', label: 'Address Line 1', type: 'text', required: true, placeholder: 'Enter address' },
  { name: 'addressLine2', label: 'Address Line 2', type: 'text', placeholder: 'Enter address line 2 (optional)' },
  { name: 'city', label: 'City', type: 'text', required: true, placeholder: 'Enter city' },
  { name: 'state', label: 'State/Province', type: 'text', required: true, placeholder: 'Enter state' },
  { name: 'postalCode', label: 'Postal Code', type: 'text', required: true, placeholder: 'Enter postal code' },
  { name: 'hireDate', label: 'Hire Date', type: 'date', required: true },
  { name: 'terminationDate', label: 'Termination Date', type: 'date' },
  { name: 'emergencyContactName', label: 'Emergency Contact Name', type: 'text', placeholder: 'Enter contact name' },
  { name: 'emergencyContactPhone', label: 'Emergency Contact Phone', type: 'text', placeholder: 'Enter contact phone' },
  { name: 'emergencyContactRelationship', label: 'Emergency Contact Relationship', type: 'text', placeholder: 'e.g., Spouse, Parent' },
  { name: 'isActive', label: 'Active', type: 'switch' },
];

const EmployeeManagement: React.FC = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await mockDataService.getEmployees();
      setData(result);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreate = async (formData: Partial<Employee>) => {
    await mockDataService.createEmployee(formData);
    await loadData();
  };

  const handleUpdate = async (id: string, formData: Partial<Employee>) => {
    await mockDataService.updateEmployee(id, formData);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await mockDataService.deleteEmployee(id);
    await loadData();
  };

  return (
    <CrudPage
      title="Employees"
      description="Manage employee records"
      data={data}
      columns={columns}
      fields={fields}
      idField="employeeId"
      isLoading={isLoading}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      searchPlaceholder="Search employees..."
    />
  );
};

export default EmployeeManagement;
