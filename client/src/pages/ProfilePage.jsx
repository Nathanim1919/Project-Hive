import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';



export default function ProfilePage({activeUser}) {
  
  const {id}  = useParams();


  const [user, setUser] = useState({});


 // get active user
  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(`http://localhost:5000/user/${id}`);
      setUser(user.data.user);
      console.log(activeUser);
    };
    getUser();
  }, [id]);

  return <div>{user && user.name}</div>;
}
