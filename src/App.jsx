import './App.css';
import Navbar from './components/nabar';
import Home from './components/home';
import { Box } from '@chakra-ui/react';


function App() {
  return (
    <>
      <Navbar />
      <Box p={2} >
        {
          <Home />
        }
      </Box>
    </>

  )
}

export default App;
