import { createContext, useContext, useEffect, useState } from "react";
import Alert from "../components/Alert";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    const addAlert = (message, type = "success") => {
        const id = Date.now();
        setAlerts(prev => [
            ...prev,
            { id, message, type }
        ]);
        setTimeout(() => {
            setAlerts(prev => prev.filter(a => a.id !== id));
        }, 3000);
    };

    return (
        <AlertContext.Provider value={{ addAlert }}>
            <Alert alerts={alerts} />
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);