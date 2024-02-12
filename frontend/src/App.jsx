import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import './App.css'
import Signin from './pages/Signin';
import About from './pages/About';
import Signup from './pages/Signup';

function App() { 

  return (
   
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/sign-in' element={<Signin />}/>
        <Route path='/sign-up' element={<Signup />}/>
      </Routes>
     </BrowserRouter>
  
  )
}

export default App
