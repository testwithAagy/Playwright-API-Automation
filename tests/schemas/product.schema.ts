
import { z } from 'zod';

export const productSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    stock: z.number(),
    brand: z.string().optional(),
});

export type Product = z.infer<typeof productSchema>;
export const productListSchema = z.object({
    products: z.array(productSchema),
    total: z.number(),
    skip: z.number(),
    limit: z.number(),
});

export const productErrorSchema = z.object({
    message: z.string(),
});

export const createProductResponseSchema = z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
    category: z.string(),
});

export const updateProductResponseSchema = productSchema;

export const deleteProductResponseSchema = z.object({
    id: z.number(),
    isDeleted: z.boolean(),
    deletedOn: z.iso.datetime(),
});

export const emptyProductResponseSchema = z.object({
    id: z.number(),
});

export const invalidPriceProductResponseSchema = z.object({
    id: z.number(),
    title: z.string(),
    price: z.string(),
    category: z.string(),
});