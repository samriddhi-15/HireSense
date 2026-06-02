import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home'
import Layout from './components/layouts/Layout'
import SignUp from './components/signup/Signup'
import Login from './components/login/Login'
import About from './components/about/About'
import Practice from './components/practice/Practice'
import Progress from './components/progress/Progress'
import Dashboard from './components/dashboard/Dashboard'
import PracticeGrid from './components/practiceGrid/PracticeGrid'
import DSAcompile from './components/pages/data/DSA/DSAcompile/DSAcompile'
import MockInterviewsCompile from './components/pages/data/mockInterviews/mockInterviewsCompile/MockInterviewsCompile'
import FrontendCompile from './components/pages/data/frontendInterviews/FrontendCompile/FrontendCompile'
import HrInterviewCompile from './components/pages/data/hrInterview/HrInterviewCompile/HrInterviewCompile'
import DailyChallengesCompile from './components/pages/data/dailyChallenges/DailyChallengesCompile/DailyChallengesCompile'
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './components/login/ForgotPassword'
import ResetPassword from './components/login/ResetPassword'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          {/* <Route path='/home' element={<Home />}></Route> */}
          <Route path='/about' element={<About />}></Route>
          <Route path='/practice' element={<Practice />}></Route>
          <Route path='/progress' element={<Progress />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/practiceGrid' element={<PracticeGrid />}></Route>
          <Route path='/dsacompile' element={<DSAcompile />}></Route>
          <Route path='/mockinterviewscompile' element={<MockInterviewsCompile />}></Route>
          <Route path='/frontendCompile' element={<FrontendCompile />}></Route>
          <Route path='/hrInterviewCompile' element={<HrInterviewCompile />}></Route>
          <Route path='/DailyChallengesCompile' element={<DailyChallengesCompile />}></Route>

        </Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword />}></Route>
        <Route path='/resetPassword/:id' element={<ResetPassword />}></Route>
      </Routes>

      <ToastContainer/>
    </>
  )
}

export default App
