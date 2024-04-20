import { useForm } from 'react-hook-form';
import { useTasks } from '../context/task.context.jsx'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import days from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
days.extend(utc);


function TasksFormPage () {

    const { handleSubmit, register, setValue } = useForm();
    const { createTask, getTask, updateTask } = useTasks();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=> {
        if(params.id) {
            async function loadTask () {
                const taskData = await getTask(params.id);
                setValue('title', taskData.title);
                setValue('description', taskData.description);
                setValue('date', days(taskData.date).utc().format('YYYY-MM-DD'));
            }
            loadTask();
        }
    }, [])

    const onSubmit = handleSubmit((formData) => {
        if(params.id) {
            updateTask(params.id, formData);
            navigate('/tasks');
        } else {
            createTask(formData);
            navigate('/tasks');
        }
    })

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <h1 className='text-2xl font-bold'>Make a task!</h1>
                <form onSubmit={onSubmit}>
                    <input className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' type='text' {...register('title', { required: true })} placeholder='Title' autoFocus/>
                    <textarea className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' rows='3' {...register('description', { required: true })} placeholder='Description'></textarea>
                    <input className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' type='date' {...register('date', { required: false })}/>
                    <button type='submit' className='bg-indigo-500 px-3 py-2 rounded-md'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default TasksFormPage;