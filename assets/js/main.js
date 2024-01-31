// services
class HttpRequest {
  constructor(apiUrl) {
    this.apiUrl = apiUrl
  }

  async get(url) {
    const response = await fetch(`${this.apiUrl}/${url}`)
    return response.json();
  }

  async post(url, options = {}) {
    // code something logic
    const response = await fetch(`${this.apiUrl}/${url}`, {
      method: 'POST',
      ...options
    })
    return response.json();
  }
}
const httpRequest = new HttpRequest('https://jsonplaceholder.typicode.com');


const formSubmit = document.getElementById("issue-form");
const issues = JSON.parse(localStorage.getItem('issues')) || [];
const issuesList = document.getElementById('issues-list');
formSubmit.addEventListener("submit", handleAddTodo);

// https://jsonplaceholder.typicode.com/todos -> get all list
// https://jsonplaceholder.typicode.com/todos?_limit=10&_page=2 -> pagination
// initialize
async function initialize() {
  const data = await httpRequest.get('todos?_limit=10&_page=1');
  fetchIssues(data); 
  // fetch('https://jsonplaceholder.typicode.com/todos?_limit=10&_page=1') // promise
  //   .then(response => response.json()) // promise
  //   .then(data => {
  //     fetchIssues(data); 
  //   })
}

initialize();

// luu data
function handleAddTodo(e) {
  e.preventDefault();
  const description = document.getElementById("issue-description").value;
  const severity = document.getElementById("issue-severity").value;
  const id = Date.now();
  const status = 'Open';
    
  if (description.length === 0) {
    alert("Không được để trống");
    return;
  }

  const issueItem = { id, title: description, severity, status };
  // add todo -> call api (issueItem) to BE

  // let issues = [];
  // if (localStorage.getItem('issues')) {
  //   issues = JSON.parse(localStorage.getItem('issues'));
  // }
  // issues.push(issue);
  // localStorage.setItem('issues', JSON.stringify(issues));
  const data = [...issues, issueItem];
  localStorage.setItem('issues', JSON.stringify(data));
  fetchIssues(data);
}

// handle delete
function deleteIssue(todoId) {
  console.log("deleteIssue -> todoId", todoId)
}

// fetch data pure function
function fetchIssues(data) {
  if(data.length === 0) return;

  console.log('data: ', data)

  issuesList.innerHTML = '';

  for (var i = 0; i < data.length; i++) {
    const { id, title, completed } = data[i];
    issuesList.innerHTML += ` <section class="mt-3 mb-3">
  <div class="issues-detail border border-dark-subtle">
    <div class="id-status d-flex ps-2 p-1 bg-secondary-subtle border-bottom border-dark-subtle ">
      <p class="id p-1">${id}</p>
      <p class="fw-bold rounded-3 bg-secondary ms-2 text-white p-1">${completed}</p>
    </div>

    <div class="description ps-2 p-1">
      <h3>${title}</h3>
    </div>

    <div class="status-group d-flex flex-row justify-content-end align-items-center">
      <div class="status m-4">
        <button class="btn btn-primary btn-dark" onclick="closeIssue(${id})" id="Close">Close</button>
        <button class="btn btn-primary btn-danger" onclick="deleteIssue(${id})" id="Delete">Delete</button>
      </div>
    </div>
</section> `;
  }
}


  

// example render todo list with pure js
// const mockTodos = [
//   {
//     id: '2321312312122131',
//     description: 'xx',
//     severity: 'xx',
//     status: 'new'
//   }
// ]


// function handleAddTodo() {
//   const todoItem = {
//     id: Date.now(),
//     description: 'xxxxxxx',
//     severity: 'low',
//     status: 'new'
//   }
//   mockTodos.unshift(todoItem)
// }


// mapIssue.forEach((issue) => {
//   issuesList.innerHTML += `
//       <li id="issue-list-item--${issue.id}" class="issue-list-item">
//           <div class="list-item-header">
//               <div for="" class="list-item-title">${issue.id}</div>
//               <div id="issueStatus" class="list-item-status">
//                   ${issue.status}
//               </div>
//           </div>
//           <div class="list-item-content">
//               <h3 class="issue-name">${issue.description}</h3>
//               <div class="list-item-severity">${issue.severity}</div>
//               <div class="list-item-group-btn">
//                   <button 
//                       id="changeSttBtn" 
//                       class="btn btn--close"
//                       onclick="updateIssueStt(
//                         '${issue.id}', '${issue.status}')"
//                   >
//                       ${issue.status === 'new' ? 'Close' : 'Open'}
//                   </button>
                  
//                   <button 
//                       class="btn btn--delete" 
//                       onclick="deleteIssue('${issue.id}')"
//                   >Delete</button>
//               </div>
//           </div>
//       </li>
//       <br>
//   `;
// });