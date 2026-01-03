import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
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
      return <ChevronUp className="w-4 h-4 opacity-30 transition-all" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-primary transition-all" />
    ) : (
      <ChevronDown className="w-4 h-4 text-primary transition-all" />
    );
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Search */}
      {searchKeys.length > 0 && (
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-all group-focus-within:text-primary" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 h-11 bg-card/50 border-border/50 focus:bg-card transition-all shadow-sm hover:shadow-md"
            />
          </div>
          {search && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-slide-in">
              <Filter className="w-4 h-4" />
              <span className="font-medium">{filteredData.length} results</span>
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-border/50 overflow-hidden bg-card shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-hero border-b border-border/50">
                {columns.map(column => (
                  <th
                    key={column.key}
                    className={cn(
                      'px-6 py-4 text-left text-sm font-semibold text-foreground',
                      column.sortable && 'cursor-pointer select-none hover:bg-primary/5 transition-colors',
                      column.className
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2 group">
                      <span className="transition-colors group-hover:text-primary">{column.header}</span>
                      {column.sortable && <SortIcon columnKey={column.key} />}
                    </div>
                  </th>
                ))}
                {actions && (
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
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
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                        <Search className="w-8 h-8 opacity-50" />
                      </div>
                      <p className="text-sm font-medium">{emptyMessage}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={cn(
                      'border-b border-border/30 last:border-0 transition-all duration-200',
                      onRowClick && 'cursor-pointer',
                      'hover:bg-gradient-hero/50 hover:shadow-sm'
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map(column => (
                      <td
                        key={column.key}
                        className={cn('px-6 py-4 text-sm text-foreground', column.className)}
                      >
                        {column.accessor(row)}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-6 py-4 text-right">
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <p className="text-sm text-muted-foreground font-medium">
            Showing <span className="font-semibold text-foreground">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-semibold text-foreground">{Math.min(currentPage * pageSize, sortedData.length)}</span> of{' '}
            <span className="font-semibold text-foreground">{sortedData.length}</span> entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="gap-1 font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all shadow-sm"
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
                    className={cn(
                      "w-10 font-medium transition-all shadow-sm",
                      currentPage === page
                        ? "bg-gradient-primary text-white shadow-md hover:shadow-lg"
                        : "hover:bg-primary/10 hover:text-primary"
                    )}
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
              className="gap-1 font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all shadow-sm"
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