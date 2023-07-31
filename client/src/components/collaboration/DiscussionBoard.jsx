import React from 'react'
import TeamMembers from '../chat/teamMembers'
import Chatting from '../chat/chatting';
import "../../styles/chat/discussionBoard.css";

export default function DiscussionBoard({project}) {
  return (
    <div className='discussionBoard'>
      <TeamMembers project={project} />
      <Chatting project={project}/>
    </div>
  );
}