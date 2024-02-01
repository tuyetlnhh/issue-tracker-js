const formSubmit = document.getElementById("issue-form");
const issuesList = document.getElementById('issues-list');
let issues = JSON.parse(localStorage.getItem('issues')) || [];
formSubmit.addEventListener("submit", handleAddTodo);
// luu data
function handleAddTodo(event) {
  event.preventDefault();
  const description = document.getElementById("issue-description").value;
  const severity = document.getElementById("issue-severity").value;
  const id = Date.now();
  const status = 'Open';
  formSubmit.reset();
  if (description.length === 0) {
    alert("Không được để trống");
    return;
  }

  // Store data in localStorage
  const issueItem = { id, description, severity, status };
  const data = [...issues, issueItem];
  console.log(data);
  localStorage.setItem('issues', JSON.stringify(data));
  fetchIssues(data);

  // Issue list had changed so update it
  issues = JSON.parse(localStorage.getItem('issues')) || [];
}

// Delete data in localStorage
function deleteIssue(todoId) {
  // Filter out the Issue ID
  const remainingIssues = issues.filter(issue => ((issue.id) != todoId))
  window.localStorage.removeItem('issues');
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues(remainingIssues);
  issues = JSON.parse(localStorage.getItem('issues')) || [];
}

//Close issue
function closeIssue(todoId) {
  // Find the issue by id and change status to close
  const issue = issues.find(issue => ((issue.id) === todoId))
  issue.status = 'Closed';
  console.log('issues: ', issues);
  // Change issue list and store it in localStorage
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues(issues);
  issues = JSON.parse(localStorage.getItem('issues')) || [];
}

function filterByStatus(status) {
  if (status === 'All') {
    fetchIssues(issues);
    return;
  }
  const filteredIssues = issues.filter(issue => issue.status == status);
  console.log('filteredIssues: ', filteredIssues);
  fetchIssues(filteredIssues);
}

// fetch data pure function
function fetchIssues(data) {
  if(data.length === 0) {
    issuesList.innerHTML = '';
    return;
  }
  console.log('data: ', data)
  // Init issuesList
  issuesList.innerHTML = '';

  for (var i = 0; i < data.length; i++) {
    const { id, description, severity, status } = data[i];
    issuesList.innerHTML += `
    <div class="issues-detail border border-dark-subtle my-3">
      <div class="id-status  ps-2 p-1 bg-secondary-subtle border-bottom border-dark-subtle ">
        <p class="id p-1">ID: ${id}</p>
      </div>

      <div class="description ps-2 p-1">
        <div class = d-flex>
          <div class="badge text-wrap bg-primary">${severity}</div>
          <div class="badge text-wrap ms-2 ${status === 'Closed' ? 'bg-secondary' : 'bg-info'}">${status}</div>
        </div>
        <h3 class = "${status === 'Closed' ? 'text-decoration-line-through font-italic' : ''}">${description}</h3>
      </div>

      <div class="status-group d-flex flex-row justify-content-end align-items-center">
        <div class="status m-4">
          <button class="btn btn-primary btn-dark" onclick="closeIssue(${id})" id="Close">Close</button>
          <button class="btn btn-primary btn-danger" onclick="deleteIssue(${id})" id="Delete">Delete</button>
        </div>
      </div>
    </div> `;
  }
}
fetchIssues(issues); 
