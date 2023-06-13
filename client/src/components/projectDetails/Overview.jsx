import React from 'react'
import Progress from '../progress/progress'

export default function Overview({project}) {
  return (
    <>
      <div className="project-progress">
        <div className="tasks">
          <h1>{project.tasks.length}</h1>
          <p>Total tasks</p>
        </div>
        <div className="started">
          <h1>
            {project.tasks.filter((pro) => pro.status === "Planning").length}
          </h1>
          <p>Planning</p>
        </div>
        <div className="inprogress">
          <h1>
            {project.tasks.filter((pro) => pro.status === "In Progress").length}
          </h1>
          <p>In progress</p>
        </div>
        <div className="completed">
          <h1>
            {project.tasks.filter((pro) => pro.status === "Completed").length}
          </h1>
          <p>Completed</p>
        </div>

        <div className="overallProgress">
          <Progress animates={1000} total={200} progress={100} />
          <p>overall progress</p>
        </div>
      </div>
      <div className="project-budget">
        <div className="total-budget">
          <p>Total Budget</p>
          <h1>{project.budget} BIrr</h1>
        </div>
        <div className="internal-cost">
          <div>
            <p>Internal cost</p>
            <h1>{project.internalCost} Birr</h1>
          </div>
          <div className="circle-progress">
            <Progress
              animates={1000}
              total={project.budget}
              progress={project.internalCost}
            />
          </div>
        </div>
        <div className="Budget-Left">
          <div>
            <p>Budget Left</p>
            <h1>{project.budgetLeft} Birr</h1>
          </div>
          <div>
            <Progress
              animates={1000}
              total={project.budget}
              progress={project.budgetLeft}
            />
          </div>
        </div>
      </div>
    </>
  );
}
