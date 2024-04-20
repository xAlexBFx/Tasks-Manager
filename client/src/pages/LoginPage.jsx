import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth.context.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function LoginPage () {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const { signin, isAuthenticated, errors: LoginErrors } = useAuth();
    const navigate = useNavigate();
    const onSubmit = handleSubmit((data)=> {
        signin(data);
    })

    useEffect(() => {
        if(isAuthenticated) navigate('/task');
    },[isAuthenticated])

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                    {
                        LoginErrors.map((err, i) => (
                            <div key={i} className='bg-red-500 p2 m-2 text-white'>
                                - {err}.
                            </div>
                        ))
                    }
                </div>
                <h1 className='text-2xl font-bold'>Login</h1>
                <form onSubmit={onSubmit}>
                <input type="email" {...register('email', { required: true })} className='w-full bg-zinc-700 text-white px-4 p-y2 rounded-md my-2'placeholder='Email'/>
                {errors.email && (<p className='text-red-500'>Email is required!</p>)}
                <input type="password" {...register('password', { required: true })} className='w-full bg-zinc-700 text-white px-4 p-y2 rounded-md my-2'placeholder='password'/>
                {errors.password && (<p className='text-red-500'>Password is required!</p>)}
                <button type='submit' className='bg-indigo-500 px-3 py-2 rounded-md'>Login</button>
                </form>

                <p className='flex gap-x-2 justify-between'>Dont you have an account?{" "} <a href="/register" className='text-sky-500 '>Sign Up</a></p>
            </div>
        </div>
    )
}

export default LoginPage;