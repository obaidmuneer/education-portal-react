import { useContext, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Center, Spinner } from '@chakra-ui/react';
import Home from './components/home';
import CDrawer from './components/cDrawer';
import Navbar from './components/navbar';
import Signin from './components/signin';
import Signup from './components/signup';
import { GlobalContext } from './context/context';
import './App.css';
import RefreshButton from './components/refreshButton';

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
        dispatch({
          type: 'signin',
          payload: false
        })
        console.log('please signin to enjoy all our features');
      }
    })()
  }, [])

  return (
    <>
      {
        state.user === null ? <Center minH={'100vh'}  >
          <Spinner color='orange.400' thickness='6px' minH={100} minW={100} speed='0.6s' emptyColor='gray' />
        </Center>
          : <Navbar />}
      {
        state.user === false ? <>
          <RefreshButton />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='*' element={<Navigate to={'/'} replace={true} />} />
          </Routes>
        </>
          : null
      }
      {
        state.user ? <>
          <CDrawer />
          <RefreshButton />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<Navigate to={'/'} replace={true} />} />
          </Routes>
        </> : null
      }
    </>

  )
}

export default App;
