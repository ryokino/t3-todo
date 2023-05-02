import useStore from '~/store'
import { api } from '~/utils/api'

const useMutateTask = () => {
    const utils = api.useContext()
    const reset = useStore((state) => state.resetEditedTask)
    
    const createTaskMutation = api.todo.createTask.useMutation({
        onSuccess: (res) => {
            const previousTodos = utils.todo.getTasks.getData()
            if (previousTodos) {
                utils.todo.getTasks.setData(undefined,[res, ...previousTodos])
            }
            reset()
        }
    })

    const updateTaskMutation = api.todo.updateTask.useMutation({
        onSuccess: (res) => {
            const previousTodos = utils.todo.getTasks.getData()
            if (previousTodos) {
                utils.todo.getTasks.setData(
                    undefined,
                    previousTodos.map((task) => {
                        if (task.id === res.id) {
                            return res
                        }
                        return task
                    }))
            }
            reset()
        }
    })

    const deleteTaskMutation = api.todo.deleteTask.useMutation({
        onSuccess: (_, variables) => {
            const previousTodos = utils.todo.getTasks.getData()
            if (previousTodos) {
                utils.todo.getTasks.setData(
                    undefined,
                    previousTodos.filter((task) => task.id !== variables.taskId))
            }
        }
    })
    return {createTaskMutation, updateTaskMutation, deleteTaskMutation}
}

export default useMutateTask
