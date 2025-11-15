"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`

  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [newScore, setNewScore] = useState("");
  const [completed, setCompleted] = useState(false);
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title </a>
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />

      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>

      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>
      
            <h4>Module Object</h4>

      <a className="btn btn-secondary me-2" id="wd-get-module" href={`${HTTP_SERVER}/lab5/module`}>
        Get Module
      </a>

      <a className="btn btn-info" id="wd-get-module-name" href={`${HTTP_SERVER}/lab5/module/name`}>
        Get Module Name
      </a>

      <hr />
      <FormControl
        className="mb-2"
        placeholder="New Module Name"
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
      />

      <a
        className="btn btn-success me-2"
        id="wd-update-module-name"
        href={`${HTTP_SERVER}/lab5/module/name/${moduleName}`}
      >
        Update Module Name
      </a>

      <hr />
      
      <FormControl
        className="mb-2"
        placeholder="New Module Description"
        value={moduleDescription}
        onChange={(e) => setModuleDescription(e.target.value)}
      />

      <a
        className="btn btn-warning"
        id="wd-update-module-description"
        href={`${HTTP_SERVER}/lab5/module/description/${moduleDescription}`}
      >
        Update Module Description
      </a>

      <hr />

      <h4>Assignment Score and Completed</h4>

      <FormControl
        type="number"
        className="w-50 mb-2"
        placeholder="New Score"
        value={newScore}
        onChange={(e) => setNewScore(e.target.value)}
      />

      <a
        className="btn btn-dark me-2"
        id="wd-update-assignment-score"
        href={`${HTTP_SERVER}/lab5/assignment/score/${newScore}`}
      >
        Update Score
      </a>

      <hr/>
      <div className="form-check mb-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="wd-update-assignment-completed-checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <label className="form-check-label ms-1">Completed?</label>
      </div>

      <a
        className="btn btn-danger"
        id="wd-update-assignment-completed"
        href={`${HTTP_SERVER}/lab5/assignment/completed/${completed}`}
      >
        Update Completed
      </a>

    </div>
);}
