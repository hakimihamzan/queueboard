import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home';
import ProjectPage from './pages/Project';
import LoginPage from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { checkIfUserCurrentlyLoggedIn, authStateReset } from './features/auth/authSlice';
import NavbarTemp from './components/NavbarTemp';

function App() {
  const dispatch = useAppDispatch()
  const { isError, isSuccess } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (isError || isSuccess) {
      dispatch(authStateReset())
    }
  }, [dispatch, isError, isSuccess, authStateReset])

  useEffect(() => {
    dispatch(checkIfUserCurrentlyLoggedIn())
  }, [dispatch, checkIfUserCurrentlyLoggedIn, authStateReset])

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/project' element={<PrivateRoute />}>
            <Route path='/project' element={<ProjectPage />} />
          </Route>
        </Routes>
        <NavbarTemp />
      </Router>
    </>
  )
}

export default App;
