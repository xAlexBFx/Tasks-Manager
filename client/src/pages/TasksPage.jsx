import { useEffect } from 'react';
import { useTasks } from '../context/task.context.jsx';
import TaskCard from '../components/TaskCard.jsx';

function TasksPage () {
    const { getTasks, tasks } = useTasks();

    useEffect(()=> {
        getTasks();
    },[])
    if (tasks.length == 0) return <h1>No Tasks</h1>
    return (
        <div className='grid sm:grid-cols-2 grid-cols-3 gap-2'> 
            {
                tasks.map(task => (
                    <TaskCard key={task._id} task={task} />))
            }
        </div>
    )
}

export default TasksPage;