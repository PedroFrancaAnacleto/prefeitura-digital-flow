
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from '@/components/ui/checkbox';
import { CreateUserFormData } from '../schemas/createUserSchema';

interface PermissionsSectionProps {
  form: UseFormReturn<CreateUserFormData>;
}

const availablePermissions = [
  { id: 'create_processes', label: 'Criar processos' },
  { id: 'sign_documents', label: 'Assinar documentos' },
  { id: 'manage_users', label: 'Gerenciar usuários' },
  { id: 'manage_publications', label: 'Gerenciar publicações' },
  { id: 'access_reports', label: 'Acessar relatórios' },
  { id: 'access_admin', label: 'Acessar administração' },
];

export const PermissionsSection: React.FC<PermissionsSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="permissions"
      render={() => (
        <FormItem>
          <FormLabel>Permissões</FormLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {availablePermissions.map((permission) => (
              <FormField
                key={permission.id}
                control={form.control}
                name="permissions"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={permission.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(permission.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value || [], permission.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== permission.id
                                  )
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {permission.label}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
