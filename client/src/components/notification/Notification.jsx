import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import axios from "axios";

export default function Notification({ id }) {
  const [activeUser, setActiveUser] = useState({});

  // get active user
  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(`http://localhost:5000/user/${id}`);
      setActiveUser(user.data.user);
      console.log(activeUser);
      console.log('activeUser');
    };


    getUser();
  }, [id]);

  return (
    <div className="mes-not">
      <div className="notifications">
        <p>Notifications</p>
        <div className="notification-list">
          {activeUser.notifications && activeUser.notifications.map((notify) => (
            <div className={notify.isread?"notify read":"notify unread"}>
              <div className="logo">
                <IoMdNotificationsOutline />
              </div>
              <div className="message">
                <p className="no-header">{notify.type}</p>
                <p className="no-body">{(notify.message).slice(0,37)}...</p>
                <p>{notify.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}