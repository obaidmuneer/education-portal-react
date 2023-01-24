import './App.css';
import Navbar from './components/nabar';
import Home from './components/home';
import { Box } from '@chakra-ui/react';
import CDrawer from './components/cDrawer';
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './components/signup';
import Signin from './components/signin';
import { useContext } from 'react';
import { GlobalContext } from './context/context';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const { state, dispatch } = useContext(GlobalContext)

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${state.api}users/profile`, {
          withCredentials: true
        })
        // console.log(result);
        dispatch({
          type: 'signin',
          payload: result.data.user
        })
      } catch (error) {
        console.log(error);
        console.log('please signin to enjoy all our features');
      }
    })()
  }, [])

  return (
    <>
      <Navbar />
      {state.user ? <CDrawer /> : null}
      <Box p={0} >
        <Routes>
          <Route path='/' element={<Home />} />
          {
            state?.user ? null : <>
              <Route path='/signup' element={<Signup />} />
              <Route path='/signin' element={<Signin />} />
            </>
          }
          <Route path='*' element={<Navigate to={'/'} replace={true} />} />
        </Routes>
      </Box>

    </>

  )
}

export default App;
