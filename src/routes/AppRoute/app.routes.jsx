import { Routes, Route } from "react-router-dom";
import App from "../../pages/App";
import Header from "../../components/Header";
import About from "../../pages/about";

export default function AppRoutes(){
return(
    <>
    <Header/>
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/sobre" element={<About/>}/>
    </Routes>
    </>
)
}