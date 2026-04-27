import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Links from "../components/layout/Links";
import Footer from "../components/layout/Footer";
import AuthModal from "../components/auth/AuthModal";

function MainLayout() {
    const [authOpen, setAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState("");
    
    return (
        <>
            <Navbar />
            <Links 
                onLogin = {() => {
                    setAuthMode("login");
                    setAuthOpen(true);
                }}
                onSignup = {() => {
                    setAuthMode("signup");
                    setAuthOpen(true);
                }}
            />
            <AuthModal 
                open = {authOpen}
                mode = {authMode}
                onClose = {() => setAuthOpen(false)}
            />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout