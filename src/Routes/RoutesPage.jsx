import { Route, Routes } from "react-router"
import { Login } from "../pages/Login/Login"
import { PrivateRoute } from "./PrivateRoute"
import { Dashboard } from "../pages/Dashboard/Dashboard"
import { Layout } from "../Layout"
import { Perhitungan } from "../pages/PerhitunganPage/Perhitungan"
import { CreateSpk } from "../pages/PerhitunganPage/CreateSpk"
import { ResultSpk } from "../pages/PerhitunganPage/ResultSpk"
import { RiwayatPage } from "../pages/RiwayatPage/RiwayatPage"
import { Kelola } from "../pages/Kelola Page/Kelola"
import { SignIn } from "../pages/Login/SingIn"


export const RoutesPage = () =>{
    return(
        
        <>
        <Routes>
            <Route path="/register" element={<SignIn/>} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route element={<Layout/>} >
                    <Route path="/" element={<Dashboard />} />
                    <Route path='/calories' element={<Perhitungan />} />
                        <Route path= "/calories/food/:id" element={<CreateSpk />} />
                        <Route path= "/calories/result/:id" element={<ResultSpk />} />
                    <Route path='/riwayatHitung' element={<RiwayatPage />} />
                    <Route path='/users' element={<Kelola />} />
                </Route>    
            </Route>
        </Routes>
        </>
    )
}