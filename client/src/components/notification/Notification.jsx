import React from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";

export default function Notification() {
  return (
    <div className="mes-not">
      <div className="notifications">
        <p>notification</p>
        <div className="notification-list">
          <div className="notify">
            <div className="logo">
              <IoMdNotificationsOutline />
            </div>
            <div className="message">
              <p>Task completed request</p>
              <p>2:43 AM may 12, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
