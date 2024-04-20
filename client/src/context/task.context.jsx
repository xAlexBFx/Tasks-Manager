import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from '../api/tasks.js';

import days from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
days.extend(utc);

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if(!context) {
        throw new Error('UseTasks must be used within a TaskProvider')
    }

    return context;
}

export function TaskProvider ({ children }) {
    const [tasks, setTask] = useState([]);

    const getTasks = async() => {
        try {
            const res = await getTasksRequest();
            setTask(res.data);
        } catch (err) {
            console.log(err)
        }
    }

    const getTask =  async id => {
        try {
            const res = await getTaskRequest(id);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err)
        }
    }

    const createTask = async(task) => {
        try {
            if(task.date !== '') task.date = days.utc(task.date).format();
            else delete task.date;
            const res = await createTaskRequest(task);
            console.log(res)
        }catch (err) {
            console.log(err);
        }
    }

    const updateTask = async (id, task) => {
        try {
            if(task.date !== '') task.date = days.utc(task.date).format();
            else delete task.date;
            const res = await updateTaskRequest(id, task);
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteTask = async(id) => {
        try {
            const res = await deleteTaskRequest(id);
            if(res.status === 204) setTask(tasks.filter(task => task._id !== id))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            getTask,
            updateTask,
            deleteTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}