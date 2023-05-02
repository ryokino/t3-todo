import { createTaskSchema, deleteTaskSchema, getSingleTaskSchema, updateTaskSchema } from "~/schema/todo";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "./trpc";


// create todo Router using createTRCPRouter and protectedProcedure from trpc.ts

export const todoRouter = createTRPCRouter({
    // create task
    createTask: protectedProcedure.input(createTaskSchema).mutation(async ({ ctx, input }) => {
        // create task with prisma
        const task = await ctx.prisma.task.create({
            data: {
                ...input,
                user: {
                    connect: {
                        id: ctx.session?.user?.id
                    }
                }
            }
        })
        return task
    }),
    // get all tasks
    getTasks: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.task.findMany({
            where: {
                userId: ctx.session?.user?.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }),
    // get a single task
    getSingleTask: protectedProcedure.input(getSingleTaskSchema).query(({ ctx, input }) => {
        return ctx.prisma.task.findUnique({
            where: {
                id: input.taskId
            }
        })
    }),
    // update a task
    updateTask: protectedProcedure.input(updateTaskSchema).mutation(async ({ ctx, input }) => {
        const task = await ctx.prisma.task.update({
            where: {
                id: input.taskId
            },
            data: {
                title: input.title,
                body: input.body
            },
        })
        return task
    }),
    // delete a task
    deleteTask: protectedProcedure.input(deleteTaskSchema).mutation(async ({ ctx, input }) => { 
        await ctx.prisma.task.delete({
            where: {
                id: input.taskId
            },
        })
    }),
})
