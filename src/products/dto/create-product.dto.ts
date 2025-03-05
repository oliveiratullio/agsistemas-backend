import { z } from 'zod';

export const CreateProductSchema = z.object({
  codigo: z.string(),
  nome: z.string(),
  codigo_barras: z.string().optional(),
  quantidade: z.number(),
  preco: z.number(),
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
