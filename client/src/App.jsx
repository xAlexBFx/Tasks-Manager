import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/auth.context.jsx'
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProtectedRoute from './ProtectedRoutes.jsx'
import TasksPage from './pages/TasksPage.jsx';
import TasksFormPage from './pages/TasksFormPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { TaskProvider } from './context/task.context.jsx';
import NavBar from './components/Navbar.jsx';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <main className='container mx-auto px-10'>
          <NavBar/>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/register' element={<RegisterPage/>}/>

              <Route element={<ProtectedRoute/>}>
                <Route path='/tasks' element={<TasksPage/>}/>
                <Route path='/add-task' element={<TasksFormPage/>}/>
                <Route path='/tasks/:id' element={<TasksFormPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
              </Route>
            </Routes>
        </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
