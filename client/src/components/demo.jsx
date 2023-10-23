import React from "react";
import '../styles/demo.css'
import {
  GiCancel
} from "react-icons/gi";

export default function Demo({setTryDemo}) {
  return (
    <div id="demo-container">
      <div div className = "close-demo"
      onClick = {
        () => setTryDemo(false)
      } >
        < GiCancel/>
      </div>

      <div id="infos">
      <h3>Try Demo Accounts</h3>
        <div className="role">
          <div>
            <p>Roll</p>
            <p>Email</p>
          </div>
          <div>
            <p>Project Executive</p>
            <p> fiker2 @gmail.com </p>
          </div>
          <div>
            <p>System Administrator</p>
            <p>yoseph@gmail.com</p>
          </div>

          <div>
            <p>Project Manager</p>
            <p> solomon2@gmail.com </p>
          </div>

          <div>
            <p>Team member</p>
            <p>ruth@gmail.com</p>
          </div>
        </div>
        <p className = "password" > Use Password: 123</p>
      </div>
    </div>
  );
}
