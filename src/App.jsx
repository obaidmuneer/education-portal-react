import './App.css';
import { Box } from '@chakra-ui/react'
import Navbar from './components/nabar';
import Home from './components/home';


function App() {
  return (
    <>
      <Navbar />
      <Box p={4}>
        {
          <Home />
        }
      </Box>
    </>

  )
}

export default App;
