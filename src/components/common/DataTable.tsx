import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  onRowClick?: (row: T) => void;
  actions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
  pageSize?: number;
}

export function DataTable<T extends object>({
  data,
  columns,
  searchPlaceholder = 'Search...',
  searchKeys = [],
  onRowClick,
  actions,
  emptyMessage = 'No data available',
  pageSize = 10,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search
  const filteredData = data.filter(row => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return searchKeys.some(key => {
      const value = (row as Record<string, unknown>)[key as string];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchLower);
      }
      if (typeof value === 'number') {
        return value.toString().includes(searchLower);
      }
      return false;
    });
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = (a as Record<string, unknown>)[sortColumn];
    const bValue = (b as Record<string, unknown>)[sortColumn];
    
    if (aValue === bValue) return 0;
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    const comparison = (aValue as string | number) < (bValue as string | number) ? -1 : 1;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortColumn !== columnKey) {
      return <ChevronUp className="w-4 h-4 opacity-30" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-primary" />
    ) : (
      <ChevronDown className="w-4 h-4 text-primary" />
    );
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      {searchKeys.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary-light border-b border-border">
                {columns.map(column => (
                  <th
                    key={column.key}
                    className={cn(
                      'px-4 py-3 text-left text-sm font-semibold text-foreground',
                      column.sortable && 'cursor-pointer select-none hover:bg-primary/5',
                      column.className
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.header}
                      {column.sortable && <SortIcon columnKey={column.key} />}
                    </div>
                  </th>
                ))}
                {actions && (
                  <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={cn(
                      'border-b border-border last:border-0 transition-colors',
                      onRowClick && 'cursor-pointer',
                      'hover:bg-primary-light/50'
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map(column => (
                      <td
                        key={column.key}
                        className={cn('px-4 py-3 text-sm text-foreground', column.className)}
                      >
                        {column.accessor(row)}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-4 py-3 text-right">
                        <div onClick={e => e.stopPropagation()}>{actions(row)}</div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page: number;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-9"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
