export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea
        id="wd-description"
        defaultValue="The assignment is available online Submit a link to the landing page of"
      ></textarea>
      <table>
        <tbody>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECT">PROJECT</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="Percentage">
                <option value="Percentage">Percentage</option>
                <option value="Points">Points</option>
                <option value="Letter Grade">Letter Grade</option>
                <option value="GPA">GPA</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="Online">
                <option value="Online">Online</option>
                <option value="On Paper">On Paper</option>
                <option value="No submission">No submission</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label>Online Entry Options</label>
            </td>
            <td>
              <br />
              <input type="checkbox" name="check-entry" id="wd-text-entry"
              />
              <label id="wd-text-entry">Text Entry</label>
              <br />
              <input type="checkbox" name="check-entry" id="wd-chkbox-url" />
              <label id="wd-website-url" htmlFor="wd-website-url">Website URL</label>
              <br />
              <input
                type="checkbox"
                name="check-entry"
                id="wd-media-recordings"
              />
              <label htmlFor="wd-media-recording">Media Recroding</label>
              <br />
              <input
                type="checkbox"
                name="check-entry"
                id="wd-student-annotation"
              />
              <label htmlFor="wd-student-annotation">Student Annotations</label>
              <br />
              <input type="checkbox" name="check-entry" id="wd-file-upload" />
              <label htmlFor="wd-file-upload">File Upload</label>
              <br />
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign Assign to</label>
            </td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date"> Due </label>
            </td>
            <td>
              <input
                type="date"
                defaultValue="2024-05-13"
                id="wd-due-date	"
              />
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Avalible from</label>
            </td>
            <td>
              <input
                type="date"
                defaultValue="2024-05-06"
                id="wd-available-from"
              />
            </td>
            <td>
              <label htmlFor="wd-available-until">Until </label>
              <input
                type="date"
                defaultValue="2024-05-20"
                id="wd-available-until"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <button>Cancel</button> <button>Save</button>
    </div>
  );
}
