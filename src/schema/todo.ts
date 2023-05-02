import z from "zod"

// a schema for create task input
export const createTaskSchema = z.object({
    title: z.string().max(20),
    body: z.string().min(5)
})

export type CreateTaskInput = z.TypeOf<typeof createTaskSchema>

// a schema for update task input
export const updateTaskSchema = z.object({
    taskId: z.string().cuid(),
    title: z.string().max(20),
    body: z.string().min(5)
})

export type UpdateTaskInput = z.TypeOf<typeof updateTaskSchema>

// a schema for get task input
export const getSingleTaskSchema = z.object({
    taskId: z.string().cuid()
})

//  a schema for delete task input
export const deleteTaskSchema = z.object({
    taskId: z.string().cuid()
})
