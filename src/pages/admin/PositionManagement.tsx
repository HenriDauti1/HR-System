import React, { useState, useEffect, useCallback } from 'react';
import { CrudPage, FieldConfig, ColumnConfig } from '@/components/admin/CrudPage';
import { StatusBadge } from '@/components/common/StatusBadge';
import { mockDataService } from '@/services/mockDataService';
import type { Position } from '@/types';

const columns: ColumnConfig<Position>[] = [
  { key: 'positionName', label: 'Position Name' },
  {
    key: 'isActive',
    label: 'Status',
    render: (item) => <StatusBadge status={item.isActive ? 'Active' : 'Inactive'} />,
  },
  { key: 'createdAt', label: 'Created At' },
];

const fields: FieldConfig[] = [
  { name: 'positionName', label: 'Position Name', type: 'text', required: true, placeholder: 'Enter position name' },
  { name: 'isActive', label: 'Active', type: 'switch' },
];

const PositionManagement: React.FC = () => {
  const [data, setData] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await mockDataService.getPositions();
      setData(result);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreate = async (formData: Partial<Position>) => {
    await mockDataService.createPosition(formData);
    await loadData();
  };

  const handleUpdate = async (id: string, formData: Partial<Position>) => {
    await mockDataService.updatePosition(id, formData);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await mockDataService.deletePosition(id);
    await loadData();
  };

  return (
    <CrudPage
      title="Positions"
      description="Manage job positions"
      data={data}
      columns={columns}
      fields={fields}
      idField="positionId"
      isLoading={isLoading}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      searchPlaceholder="Search positions..."
    />
  );
};

export default PositionManagement;
