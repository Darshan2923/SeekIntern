import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginForm from './components/Auth/Login'
import SignupForm from './components/Auth/Signup'
import Logout from './components/Auth/Logout'
import CreateJobs from './components/Jobs/CreateJobs'
import JobDetails from './pages/JobDetails'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/add_jobs' element={<CreateJobs />} />
        <Route path="/jobs/:id" component={<JobDetails />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App