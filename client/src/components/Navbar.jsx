import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth.context.jsx';

function NavBar () {

    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between px10 rounded-lg py-5">
            <Link to ={ isAuthenticated? '/tasks': '/'} className="text-2xl font-bold" >Task Manager</Link>
            <ul className="flex gap-x-4">
                {isAuthenticated ? (
                    <>
                        <h1>Welcome {user.username}!</h1>
                        <li>
                            <Link to='/add-task' className='bg-indigo-500 px-3 py-2 rounded-md'>Create New Task</Link>
                        </li>
                        <li>
                            <Link to='/tasks' className='bg-indigo-500 px-3 py-2 rounded-md'>My Tasks</Link>
                        </li>
                        <li>
                            <Link to='/profile' className='bg-indigo-500 px-3 py-2 rounded-md'>Profile</Link>
                        </li>
                        <li>
                            <Link to='/' className='bg-indigo-500 px-3 py-2 rounded-md' onClick={()=> {
                                logout();
                            }}>Logout</Link>
                        </li>
                    </>
                ):(
                    <>
                        <li>
                            <Link to='/login' className='bg-indigo-500 px-3 py-2 rounded-md'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register' className='bg-indigo-500 px-3 py-2 rounded-md'>Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default NavBar;