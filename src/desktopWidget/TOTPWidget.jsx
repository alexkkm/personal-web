import React, { useState, useEffect } from 'react';
import totp from './TOTPCalculation';
import './TOTPWidget.css';

const TOTPWidget=()=>{
    const secret = 'AKMKONG';
    const [otp, setOtp] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setOtp(totp(secret));
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup on unmount
        }, [secret, totp]);

    return (
        <div className='TOTPWidget'>
        <p style={{color: "#00f0ff"}}>Secret: {secret}</p>
        <p style={{color: "#00f0ff"}}>TOTP: {otp}</p>
        <p style={{color: "#00f0ff"}}>Current Time: {currentTime}</p>
        </div>
    );
}

export default TOTPWidget;