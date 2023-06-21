import { AiFillCheckCircle, AiOutlineUserDelete } from "react-icons/ai";
import MiniProgress from "../progress/miniProgress";

const Card = ({ project, removeUser }) => {
  return (
    project &&
    project.team.map((user) => (
      <div
        className="member"
        style={{
          border:
            project.projectManager && project.projectManager._id === user._id
              ? "2px solid #c2baba"
              : "0px solid",
        }}
      >
        <div className="header">
          <AiFillCheckCircle />
          <AiOutlineUserDelete onClick={() => removeUser(user._id)} />
        </div>

        <div className="profileinfo">
          <div className="image">
            <img src={user.profile} alt="" />
          </div>
          <div className="userinfo">
            <h3>{user.name}</h3>
            <p>{user.position}</p>
          </div>
        </div>

        <div className="pro-footer">
          <div className="tasksprogress">
            <p className="tasks">{user.tasks.length} Tasks</p>
            <div className="progressIndicator">
              <MiniProgress animates={2000} total={100} progress={75} />
            </div>
          </div>
          <button className="viewprofile">View profile</button>
        </div>
      </div>
    ))
  );
};
export default Card;