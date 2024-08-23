import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Layout} from './Layout'
import { Sinew } from './components/Sidebar/SiNew'
import { Perhitungan } from './pages/PerhitunganPage/Perhitungan'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Kelola } from './pages/Kelola Page/Kelola';
import { RiwayatPage } from './pages/RiwayatPage/RiwayatPage';
import { SpkFoodTable } from './pages/PerhitunganPage/SpkFoodTable';
import { CreateSpk } from './pages/PerhitunganPage/CreateSpk';
import { ResultSpk } from './pages/PerhitunganPage/ResultSpk';
import { RoutesPage } from './Routes/RoutesPage';

function App() {

  return (
    <>
      {/* <Sinew /> */}
      {/* <Perhitungan /> */}
      {/* <RiwayatPage /> */}
      {/* <Layout/> */}
      {/* <CreateSpk /> */}
      {/* <Routes>
        <Route element={<Layout/>} >
          <Route path="/" element={<Dashboard />} />
          <Route path='/calories' element={<Perhitungan />} />
            <Route path= "/calories/food" element={<CreateSpk />} />
            <Route path= "/calories/result" element={<ResultSpk />} />
          <Route path='/riwayatHitung' element={<RiwayatPage />} />
          <Route path='/users' element={<Kelola />} />
        </Route>
      </Routes> */}

      <RoutesPage />
    </>
  )
}

export default App
