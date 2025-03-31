import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string({
        required_error: 'Title is required',
        invalid_type_error: 'Invalid title'
    }),
    description: z.string({
        required_error: 'Description is required',
        invalid_type_error: 'Invalid description'
    }),
    date: z.string().datetime({message: 'Invalid date'}).optional()
});

export const updateTaskSchema = z.object({
    title: z.string({
        invalid_type_error: 'Invalid title'
    }).optional(),
    description: z.string({
        invalid_type_error: 'Invalid description'
    }).optional(),
    date: z.string().datetime({message: 'Invalid date'}).optional()
});