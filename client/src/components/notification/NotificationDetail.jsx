import react from 'react'

const NotificationDetail = ({notification}) =>{
    return(
        <div className="">
            <h2>Notification</h2>
            <div>
                <h3>Subject: <p>Project Update</p></h3>
                <p>The project with title "Project Management web app Development" Has Updated By the project Manager "Nathanim Tadele", please keep update  with the new information</p>
                <div>
                    <button>delete</button>
                    <button>mark as unread</button>
                </div>
            </div>
        </div>
    );
}

export default NotificationDetail;