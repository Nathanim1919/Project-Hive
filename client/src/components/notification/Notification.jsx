import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import axios from "axios";
import "../../styles/notification.css";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { CiUnread } from "react-icons/ci";
import { BsArrow90DegRight } from "react-icons/bs";
import {changeDate,getCurrentDateFormat} from '../../functions.js'

const Notification = ({ id, setNotificationBar }) => {
  const [activeUser, setActiveUser] = useState({});
  const [activeNotify, setActiveNotify] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        setActiveUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleNotificationClick = (notificationId) => {
    setActiveNotify(notificationId);
    setNotificationBar(true);
  };

  const handleNotificationClickClose = () => {
    setActiveNotify(null);
    setNotificationBar(false);
  };

  return (
    <div className="mes-not">
      <div className="notifications">
        {activeNotify && (
          <div className="close-notify" onClick={handleNotificationClickClose}>
            <AiOutlineClose />
          </div>
        )}
        <p>Notifications</p>
        <div className="notification-list">
          {activeUser.notifications
            ?.slice()
            .reverse()
            .map((notify) => (
              <div
                key={notify._id}
                className={`notify ${
                  notify._id === activeNotify ? "activeNotification" : ""
                }`}
                onClick={() => handleNotificationClick(notify._id)}
              >
                <div className="message">
                  <div className="notification-header">
                    <div className="logo">
                      <IoMdNotificationsOutline />
                    </div>
                    <p className="no-header">{notify.type}</p>
                  </div>
                  <p className="no-body">
                    {notify._id === activeNotify
                      ? `${notify.message.slice(0)}`
                      : `${notify.message.slice(0, 0)}`}
                  </p>
                  <p className="created-date">{changeDate(notify.createdAt)}</p>
                  {notify._id === activeNotify && (
                    <div className="notify-icons">
                      <div>
                        <AiOutlineDelete />
                      </div>
                      <div>
                        <CiUnread />
                      </div>
                      <div>
                        <BsArrow90DegRight />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Notification;