import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { DATA_SOURCE, IME_APLIKACIJE, RouteNames } from './constants'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MackoljupciPregled from './pages/mackoljupci/MackoljupciPregled'
import MackoljupciNovi from './pages/mackoljupci/MackoljupciNovi'
import MackoljupciPromjena from './pages/mackoljupci/MackoljupciPromjena'
import MackaPregled from './pages/mackoljupci/MackoljupciPregled'
import MackaNovi from './pages/mackoljupci/MackoljupciNovi'
import MackaPromjena from './pages/mackoljupci/MackoljupciPromjena'

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

            <Route path={RouteNames.MACKOLJUPCI} element={<MackoljupciPregled />} />
            <Route path={RouteNames.MACKOLJUPCI_DODAJ} element={<MackoljupciNovi />} />
            <Route path={RouteNames.MACKOLJUPCI_PROMJENA} element={<MackoljupciPromjena />} />

          </Routes>
        </Container>
        <hr />
        &copy; {IME_APLIKACIJE} ({DATA_SOURCE})
      </Container>
    </>
  )
}

export default App
