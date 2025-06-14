
import * as z from 'zod';

export const createUserSchema = z.object({
  fullName: z.string().min(3, 'Nome completo deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido').endsWith('@prefeitura.gov.br', 'Email deve ser do domínio @prefeitura.gov.br'),
  phone: z.string().regex(/^55\d{10,11}$/, 'Telefone deve estar no formato 55DDDxxxxxxxx (exemplo: 5511945450387)'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato XXX.XXX.XXX-XX'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  confirmPassword: z.string(),
  department: z.string().min(1, 'Selecione um setor'),
  role: z.string().min(1, 'Selecione uma função'),
  permissions: z.array(z.string()).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
