import { z } from 'zod';

export const CreateProductSchema = z.object({
  codigo: z.string(),
  nome: z.string(),
  codigo_barras: z.string().optional(),
  quantidade: z.number(),
  preco: z.number(),
});

export const UpdateProductSchema = z.object({
  nome: z.string().optional(),
  codigo_barras: z.string().optional(),
  quantidade: z.number().optional(),
  preco: z.number().optional(),
});
