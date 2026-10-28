import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { DATA_SOURCE, IME_APLIKACIJE, RouteNames } from './constants'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MackaPregled from './pages/macke/MackaPregled'
import MackaNovi from './pages/macke/MackaNovi'
import MackaPromjena from './pages/macke/MackaPromjena'

function App() {

  return (
    <>
      <Container>
        <Izbornik />
        <Container className='app'>
          <Routes>
            <Route path={RouteNames.HOME} element={<Home />} />

            <Route path={RouteNames.MACKE} element={<MackaPregled />} />
            <Route path={RouteNames.MACKE_DODAJ} element={<MackaNovi />} />
            <Route path={RouteNames.MACKE_PROMJENA} element={<MackaPromjena />} />

          </Routes>
        </Container>
        <hr />
        &copy; {IME_APLIKACIJE} ({DATA_SOURCE})
      </Container>
    </>
  )
}

export default App
