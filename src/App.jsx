import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Layout} from './Layout'
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
