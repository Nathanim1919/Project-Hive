import React from 'react';
import ProjectForm from '../components/project/ProjectForm';
import "../styles/dashboard.css";

export default function DashboardPage() {
  return (
    <div className='dashboard'>
      <ProjectForm/>
    </div>
  )
}
