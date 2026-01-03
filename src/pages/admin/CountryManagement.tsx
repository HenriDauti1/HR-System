import React, { useState, useEffect, useCallback } from 'react';
import { CrudPage, FieldConfig, ColumnConfig } from '@/components/admin/CrudPage';
import { StatusBadge } from '@/components/common/StatusBadge';
import { mockDataService } from '@/services/mockDataService';
import type { Country, Region } from '@/types';

const CountryManagement: React.FC = () => {
  const [data, setData] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [countries, regionsData] = await Promise.all([
        mockDataService.getCountries(),
        mockDataService.getRegions(),
      ]);
      setData(countries);
      setRegions(regionsData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const columns: ColumnConfig<Country>[] = [
    { key: 'countryName', label: 'Country Name' },
    { key: 'regionName', label: 'Region' },
    {
      key: 'isActive',
      label: 'Status',
      render: (item) => <StatusBadge status={item.isActive ? 'Active' : 'Inactive'} />,
    },
    { key: 'createdAt', label: 'Created At' },
  ];

  const fields: FieldConfig[] = [
    { name: 'countryName', label: 'Country Name', type: 'text', required: true, placeholder: 'Enter country name' },
    {
      name: 'regionId',
      label: 'Region',
      type: 'select',
      required: true,
      options: regions.map(r => ({ value: r.regionId, label: r.regionName })),
    },
    { name: 'isActive', label: 'Active', type: 'switch' },
  ];

  const handleCreate = async (formData: Partial<Country>) => {
    await mockDataService.createCountry(formData);
    await loadData();
  };

  const handleUpdate = async (id: string, formData: Partial<Country>) => {
    await mockDataService.updateCountry(id, formData);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await mockDataService.deleteCountry(id);
    await loadData();
  };

  return (
    <CrudPage
      title="Countries"
      description="Manage countries and their regional associations"
      data={data}
      columns={columns}
      fields={fields}
      idField="countryId"
      isLoading={isLoading}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      searchPlaceholder="Search countries..."
    />
  );
};

export default CountryManagement;
