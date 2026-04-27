import { React } from "react";

function Alert({ alerts }) {
    if (alerts.length === 0) return null;

    const typeClass = {
        success: "success",
        error: "danger",
        warning: "warning",
        info: "info",
    };

    return (
        <div className="alert-wrapper">
            {alerts.map((alert, index) => (
                <div key={alert.id} className={`alert bg-${alert.type || "info"} text-white text-center`} role="alert">
                    {alert.message}
                </div>
            ))}
        </div>
    );
}

export default Alert;
