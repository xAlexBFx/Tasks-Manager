import { useTasks } from '../context/task.context';
import { Link } from 'react-router-dom';

import days from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
days.extend(utc);


function TaskCard ({ task }) {
    const { deleteTask } = useTasks();
    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className='flex justify-between'>
                <h1 className= 'text-2xl font-bold' >{task.title}</h1>
                <div className="flex gap-x-2 items-center">
                    <button className='bg-indigo-500 px-3 py-2 rounded-md' onClick={() => {
                        deleteTask(task._id);
                    }}>Delete</button>
                    <Link className='bg-indigo-500 px-3 py-2 rounded-md' to= {`/tasks/${task._id}`}>Edit</Link>
                </div>
            </header>
            <p className='text-slate-300'>{task.description}</p>
            <p>To: {days(task.date).utc().format('MM/DD/YYYY')}</p>
        </div>
    )
}

export default TaskCard;