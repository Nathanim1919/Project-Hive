import React from "react";
import '../../styles/error.css';
import { AiOutlineClose } from "react-icons/ai";

export default function Error({ message, setErrorOccured }) {
  const closIcon = () => {
    setErrorOccured(false);
  };
  return (
    <div className="error-showing">
      <div className="close-box" onClick={closIcon}>
        <AiOutlineClose />
      </div>
      <p>{message}</p>
    </div>
  );
}
