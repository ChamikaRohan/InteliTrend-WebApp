import React, { useEffect } from 'react';

const WelcomeScreen = ({ onClose }) => {
    // Close the welcome screen after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    return (
        <div className="welcome-screen">
            <div class="loading">
                <svg width="64px" height="48px">
                    <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
                    <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
                </svg>
            </div>
            <p>Welcome to <span class="inteliTrend">InteliTrend</span></p>

        </div>
    );
};

export default WelcomeScreen;
