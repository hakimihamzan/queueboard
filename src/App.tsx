import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home';
import ProjectPage from './pages/Project';
import LoginPage from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/project/:id' element={<PrivateRoute />}>
            <Route path='/project/:id' element={<ProjectPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
