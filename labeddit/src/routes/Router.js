import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import FeedPage from "../pages/FeedPage/FeedPage";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>                
                <Route path="/" element={<LoginPage/>}/> 
                <Route path="/signup" element={<SignUpPage/>}/> 
                <Route path="/feed" element={<FeedPage/>}/>              
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;