import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DataTable, Column } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'datetime' | 'select' | 'switch' | 'textarea';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface ColumnConfig<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface CrudPageProps<T extends object> {
  title: string;
  description: string;
  data: T[];
  columns: ColumnConfig<T>[];
  fields: FieldConfig[];
  idField: keyof T;
  isLoading: boolean;
  onCreate: (data: Record<string, unknown>) => Promise<void>;
  onUpdate: (id: string, data: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
}

export function CrudPage<T extends object>({
  title,
  description,
  data,
  columns,
  fields,
  idField,
  isLoading,
  onCreate,
  onUpdate,
  onDelete,
  searchPlaceholder = 'Search...',
  searchKeys = [],
}: CrudPageProps<T>) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleOpenCreate = () => {
    setEditingItem(null);
    const initialData: Record<string, unknown> = {};
    fields.forEach(field => {
      if (field.type === 'switch') {
        initialData[field.name] = true;
      } else {
        initialData[field.name] = '';
      }
    });
    setFormData(initialData);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: T) => {
    setEditingItem(item);
    const data: Record<string, unknown> = {};
    fields.forEach(field => {
      data[field.name] = (item as Record<string, unknown>)[field.name] ?? '';
    });
    setFormData(data);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (id: string) => {
    setDeletingId(id);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingItem) {
        await onUpdate((editingItem as Record<string, unknown>)[idField as string] as string, formData);
        toast.success(`${title.slice(0, -1)} updated successfully`);
      } else {
        await onCreate(formData);
        toast.success(`${title.slice(0, -1)} created successfully`);
      }
      setIsFormOpen(false);
    } catch {
      toast.error(`Failed to save ${title.slice(0, -1).toLowerCase()}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setIsSaving(true);
    try {
      await onDelete(deletingId);
      toast.success(`${title.slice(0, -1)} deleted successfully`);
      setIsDeleteOpen(false);
    } catch {
      toast.error(`Failed to delete ${title.slice(0, -1).toLowerCase()}`);
    } finally {
      setIsSaving(false);
      setDeletingId(null);
    }
  };

  // Convert columns to DataTable format
  const tableColumns: Column<T>[] = columns.map(col => ({
    key: col.key as string,
    header: col.label,
    accessor: col.render
      ? (item: T) => col.render!(item)
      : (item: T) => {
          const value = (item as Record<string, unknown>)[col.key as string];
          return value !== undefined && value !== null ? String(value) : '';
        },
    sortable: true,
  }));

  // Auto-detect search keys from columns
  const effectiveSearchKeys = searchKeys.length > 0
    ? searchKeys
    : columns.map(c => c.key) as (keyof T)[];

  const renderField = (field: FieldConfig) => {
    const value = formData[field.name];

    switch (field.type) {
      case 'select':
        return (
          <Select
            value={value as string || ''}
            onValueChange={(val) => setFormData({ ...formData, [field.name]: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'switch':
        return (
          <Switch
            checked={value === true || value === 'true'}
            onCheckedChange={(checked) => setFormData({ ...formData, [field.name]: checked })}
          />
        );
      case 'textarea':
        return (
          <textarea
            value={value as string || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            placeholder={field.placeholder}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required={field.required}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={value as number || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: parseFloat(e.target.value) || 0 })}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      case 'date':
        return (
          <Input
            type="date"
            value={value as string || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            required={field.required}
          />
        );
      case 'datetime':
        return (
          <Input
            type="datetime-local"
            value={value ? String(value).slice(0, 16) : ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            required={field.required}
          />
        );
      default:
        return (
          <Input
            type="text"
            value={value as string || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
    }
  };

  const actions = (item: T) => (
    <div className="flex items-center gap-2 justify-end">
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          handleOpenEdit(item);
        }}
        className="h-8 w-8 p-0 text-primary hover:text-primary hover:bg-primary/10"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          handleOpenDelete((item as Record<string, unknown>)[idField as string] as string);
        }}
        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
          <Button onClick={handleOpenCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Add New
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <DataTable
            data={data}
            columns={tableColumns}
            searchPlaceholder={searchPlaceholder}
            searchKeys={effectiveSearchKeys}
            actions={actions}
          />
        )}

        {/* Create/Edit Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? `Edit ${title.slice(0, -1)}` : `Create ${title.slice(0, -1)}`}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                {fields.map(field => (
                  <div key={field.name} className="grid gap-2">
                    <Label htmlFor={field.name} className="flex items-center gap-1">
                      {field.label}
                      {field.required && <span className="text-destructive">*</span>}
                    </Label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? <LoadingSpinner size="sm" /> : editingItem ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this {title.slice(0, -1).toLowerCase()}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isSaving ? <LoadingSpinner size="sm" /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
}
