import React, { createContext, useContext, useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';

const NotificationContext = createContext();

let timeOutId;
const NotificationProvider = ({ children }) => {

    const [notification, setNotification] = useState({
        type: '',
        message: '',
    })

    const notificationRef = useRef();

    const [backgroundColor, setBackgroundColor] = useState('bg-red-500');

    const updateNotification = (type, message) => {
        if (timeOutId) clearTimeout(timeOutId);    // Clear previous notification
        if (!type || !message) return console.log('Notification type or message is missing');

        switch (type) {
            case 'success':
                setBackgroundColor('bg-green-500');
                break;
            case 'error':
                setBackgroundColor('bg-red-500');
                break;
            case 'warning':
                setBackgroundColor('bg-orange-500');
                break;
            default:
                setBackgroundColor('bg-gray-500');
                break;
        }

        setNotification({ type, message });    // Set notification

        timeOutId = setTimeout(() => {
            setNotification({ type: '', message: '' });     // Clear notification after 3 seconds
        }, 3000);

    }

    useEffect(() => {
        if (notification?.message) {
            notificationRef.current.classList.remove('bottom-10', 'opacity-0');
            notificationRef.current.classList.add('opacity-1', 'bottom-5');
        }
    }, [notification.message])

    return (
        <>
            <NotificationContext.Provider value={{ updateNotification }}>
                {children}
            </NotificationContext.Provider>
            {notification.message && (
                <div ref={notificationRef} className={`fixed bottom-10 opacity-0 left-1/2 -translate-x-1/2 m-4 p-4 rounded-lg ${backgroundColor} transition-all duration-150 ease-linear`}>
                    <p className="text-white">{notification.message}</p>
                </div>
            )}
        </>
    )
}

export const useNotification = () => useContext(NotificationContext);

export default NotificationProvider