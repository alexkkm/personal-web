import React, { useState, useEffect } from 'react';
import totp from './TOTPCalculation';

const TOTPGenerator=()=>{
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
        <div>
        <p style={{color: "#fff"}}>Secret: {secret}</p>
        <p style={{color: "#fff"}}>TOTP: {otp}</p>
        <p style={{color: "#fff"}}>Current Time: {currentTime}</p>
        </div>
    );
}

export default TOTPGenerator;