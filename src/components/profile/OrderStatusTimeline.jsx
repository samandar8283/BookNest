import { useRef, useEffect, useState } from "react";
const ORDER_STEPS = [
    { key: "pending", label: "Kutilmoqda", icon: "⏳" },
    { key: "paid", label: "To‘langan", icon: "💰" },
    { key: "processing", label: "Qayta ishlanmoqda", icon: "♻️" },
    { key: "shipped", label: "Yetkazilmoqda", icon: "🚚" },
    { key: "delivered", label: "Yetkazildi", icon: "✅" },
];

const getStepStatus = (stepKey, currentStatus) => {
    const currentIndex = ORDER_STEPS.findIndex(s => s.key === currentStatus);
    const stepIndex = ORDER_STEPS.findIndex(s => s.key === stepKey);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "active";
    return "upcoming";
};

const OrderStatusTimeline = ({ status }) => {
    if (status === "cancelled") {
        return (
            <div className="alert alert-danger d-flex align-items-center gap-2">
                ❌ <strong>Buyurtma bekor qilingan</strong>
            </div>
        );
    }
    const containerRef = useRef(null);
    const [graylineWidth, setGraylineWidth] = useState(0);
    const [progressWidth, setProgressWidth] = useState(0);

    const currentIndex = ORDER_STEPS.findIndex(s => s.key === status);

    useEffect(() => {
        const updateProgress = () => {
            const container = containerRef.current;
            if (!container) return;

            const containerWidth = container.offsetWidth;
            const totalCircles = ORDER_STEPS.length;
            const circleSize = 56; // px
            const spacePercent = (containerWidth - circleSize * totalCircles); // foizdan px
            const widthPx = ((currentIndex * 2 + 1) / (totalCircles * 2)) * spacePercent + circleSize * currentIndex;
            setGraylineWidth(containerWidth + spacePercent / (totalCircles - 1));

            setProgressWidth(widthPx);
        };

        window.addEventListener("resize", updateProgress);
        updateProgress();

        return () => window.removeEventListener("resize", updateProgress);
    }, [status]);

    return (
        <div className="card mb-4">
            <div className="card-header fw-bold">
                Buyurtma holati
            </div>

            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center position-relative overflow-auto pb-3" ref={containerRef}>

                    {/* PROGRESS (ACTIVE) */}
                    <div
                        className="position-absolute start-0 translate-middle-y bg-success"
                        style={{
                            top: 28,
                            height: 2,
                            width: `${progressWidth}px`,
                            zIndex: 0,
                            transition: "width 0.8s ease"
                        }}
                    />

                    {/* PROGRESS (REMAINING) */}
                    <div
                        className="position-absolute translate-middle-y bg-secondary"
                        style={{
                            top: 28,
                            left: 0,
                            height: 2,
                            width: `${graylineWidth}px`,
                            zIndex: 0
                        }}
                    />

                    {ORDER_STEPS.map((step) => {
                        const stepStatus = getStepStatus(step.key, status);

                        return (
                            <div
                                key={step.key}
                                className="d-flex flex-column align-items-center position-relative"
                                style={{ zIndex: 1, width: "100%" }}
                            >
                                {/* CIRCLE */}
                                <div
                                    className={`fs-4 border border-3 rounded-circle d-flex align-items-center justify-content-center mb-2 mx-4 order-step-circle ${stepStatus === "completed"
                                        ? "border-success bg-white"
                                        : stepStatus === "active"
                                            ? "border-primary shadow bg-primary-subtle"
                                            : "border-secondary bg-white"
                                        }`}
                                    style={{
                                        width: 56,
                                        height: 56
                                    }}
                                >
                                    {step.icon}
                                </div>

                                {/* LABEL */}
                                <small
                                    className={`text-center text-nowrap ${stepStatus === "active"
                                        ? "fw-bold text-primary"
                                        : stepStatus === "completed"
                                            ? "text-success"
                                            : "text-muted"
                                        }`}
                                >
                                    {step.label}
                                </small>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OrderStatusTimeline;