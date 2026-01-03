import React, { useState, useEffect, useCallback } from 'react';
import { CrudPage, FieldConfig, ColumnConfig } from '@/components/admin/CrudPage';
import { StatusBadge } from '@/components/common/StatusBadge';
import { mockDataService } from '@/services/mockDataService';
import type { Region } from '@/types';

const columns: ColumnConfig<Region>[] = [
  { key: 'regionName', label: 'Region Name' },
  { key: 'description', label: 'Description' },
  {
    key: 'isActive',
    label: 'Status',
    render: (item) => <StatusBadge status={item.isActive ? 'Active' : 'Inactive'} />,
  },
  { key: 'createdAt', label: 'Created At' },
];

const fields: FieldConfig[] = [
  { name: 'regionName', label: 'Region Name', type: 'text', required: true, placeholder: 'Enter region name' },
  { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter description' },
  { name: 'isActive', label: 'Active', type: 'switch' },
];

const RegionManagement: React.FC = () => {
  const [data, setData] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await mockDataService.getRegions();
      setData(result);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreate = async (formData: Partial<Region>) => {
    await mockDataService.createRegion(formData);
    await loadData();
  };

  const handleUpdate = async (id: string, formData: Partial<Region>) => {
    await mockDataService.updateRegion(id, formData);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await mockDataService.deleteRegion(id);
    await loadData();
  };

  return (
    <CrudPage
      title="Regions"
      description="Manage geographical regions"
      data={data}
      columns={columns}
      fields={fields}
      idField="regionId"
      isLoading={isLoading}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      searchPlaceholder="Search regions..."
    />
  );
};

export default RegionManagement;
