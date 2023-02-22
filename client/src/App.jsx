import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Messenger from './pages/Messenger'
import { useContext } from 'react'
import { AuthContext } from './context/context'


function App() {
  const { user } = useContext(AuthContext)


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={user ? <Messenger /> : <Login />} />

        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to='/' /> : <Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App