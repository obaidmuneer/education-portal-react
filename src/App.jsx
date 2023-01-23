import './App.css';
import Navbar from './components/nabar';
import Home from './components/home';
import { Box } from '@chakra-ui/react';
import CDrawer from './components/cDrawer';
import { Routes, Route } from 'react-router-dom'
import Signup from './components/signup';
import Signin from './components/signin';
import { useContext } from 'react';
import { GlobalContext } from './context/context';

function App() {
  const { state, dispatch } = useContext(GlobalContext)
  return (
    <>
      <Navbar />
      {state.user ? <CDrawer /> : null}
      <Box p={2} >
        {
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
          </Routes>


        }
      </Box>

    </>

  )
}

export default App;
