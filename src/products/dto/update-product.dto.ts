import { z } from 'zod';

export const UpdateProductSchema = z.object({
  nome: z.string().optional(),
  codigo_barras: z.string().optional(),
  quantidade: z.number().optional(),
  preco: z.number().optional(),
});

export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
