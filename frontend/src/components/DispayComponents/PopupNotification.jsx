import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import close icon

const PopupNotification = ({ isOpen, onClose, iconName, topic, text, iconColor = '#005597' }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.notification}>
        <button style={styles.closeButton} onClick={onClose}>
          {/* Use FontAwesomeIcon for the close icon */}
          <FontAwesomeIcon icon={faTimes} style={styles.closeIcon} />
        </button>
        <div style={styles.notificationContent}>
          <FontAwesomeIcon icon={iconName || faBell} style={{ ...styles.notificationIcon, color: iconColor }} />
          <div style={styles.notificationText}>
            <div style={styles.notificationTopic}>{topic}</div>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupNotification;

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    zIndex: 5, // Set the z-index to 5
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification: {
    backgroundColor: 'white',
    position: 'relative', // Ensure relative positioning for the close button
    padding: 5,
    borderRadius: 8,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    maxwidth:"50%"
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 0, // Remove padding
    border: '2px solid red', // Add border with red color
    borderRadius: '50%', // Make it a circle
    width: 30, // Set width
    height: 30, // Set height
    backgroundColor: 'transparent', // Transparent background
    cursor: 'pointer',
  },
  closeIcon: {
    color: 'red', // Set color to white
    fontSize: '20px', // Set font size
  },
  notificationContent: {
    margin: "2rem",
    marginRight:"5rem",
    marginLeft:"5rem",
    display: 'flex',
    flexDirection: 'column', // Align items vertically
    alignItems: 'center', // Align items horizontally
    justifyContent: 'center', // Align items vertically
  },
  
  notificationIcon: {
    marginRight: 10,
    fontSize: '4rem', // Example font size for the icon
  },
  notificationText: {
    display: 'flex',
    flexDirection: 'column', // Align items vertically
    alignItems: 'center', // Align items horizontally
    justifyContent: 'center', // Align items vertically
  },
  notificationTopic: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize:"1.5rem"
  },
};
