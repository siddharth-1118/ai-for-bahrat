import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';

const NotificationContext = React.createContext();

export const useNotifications = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children, userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to socket server
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket']
    });

    setSocket(newSocket);

    // Join user room
    if (userId) {
      newSocket.emit('join-room', userId);
    }

    // Listen for notifications
    newSocket.on('notification', (notification) => {
      setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Keep only last 10 notifications
    });

    return () => {
      newSocket.close();
    };
  }, [userId]);

  const value = {
    notifications,
    setNotifications,
    socket
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

const NotificationPanel = () => {
  const { notifications } = useNotifications();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="notification-panel">
      <div className="notification-header">
        <h3>Notifications</h3>
      </div>
      <div className="notification-list">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification-item ${notification.type}`}>
            <div className="notification-content">
              <span className="notification-message">{notification.message}</span>
              <span className="notification-time">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;