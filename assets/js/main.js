const checkIcon = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
<style type="text/css">
	.st0{clip-path:url(#SVGID_00000121247319365778417610000011969899914107235245_);{"}"}
</style>
<g>
	<defs>
		<rect id="SVGID_1_" y="0" width="24" height="24"/>
	</defs>
	<clipPath id="SVGID_00000045600068477843951190000013037292499238484386_">
		<use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
	</clipPath>
	<g style="clip-path:url(#SVGID_00000045600068477843951190000013037292499238484386_);">
		<path class="st1" d="M10,15.2L19.2,6l1.4,1.4L10,18l-6.4-6.4L5,10.2L10,15.2z"/>
	</g>
</g>
</svg>
`;
const deleteIcon = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
<style type="text/css">
	.st0{clip-path:url(#SVGID_00000080192630248232642660000015341067068418801283_);}
</style>
<g>
	<defs>
		<rect id="SVGID_1_" y="0" width="24" height="24"/>
	</defs>
	<clipPath id="SVGID_00000072278909021865617900000005863941340646011833_">
		<use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
	</clipPath>
	<g style="clip-path:url(#SVGID_00000072278909021865617900000005863941340646011833_);">
		<path class="st1" d="M4,8h16v13c0,0.3-0.1,0.5-0.3,0.7S19.3,22,19,22H5c-0.3,0-0.5-0.1-0.7-0.3C4.1,21.5,4,21.3,4,21V8z M6,10v10
			h12V10H6z M9,12h2v6H9V12z M13,12h2v6h-2V12z M7,5V3c0-0.3,0.1-0.5,0.3-0.7C7.5,2.1,7.7,2,8,2h8c0.3,0,0.5,0.1,0.7,0.3
			C16.9,2.5,17,2.7,17,3v2h5v2H2V5H7z M9,4v1h6V4H9z"/>
	</g>
</g>
</svg>
`;
const toDoList = document.querySelector('.todo-list');
const formContainer = document.querySelector('.form-container');
const formInput = document.querySelector('.add-task');
const emptyState = document.querySelector('.empty-state');
addCurrentDateInHeader = () => {

  let headerDate = document.querySelector('.date');

  const newDate = new Date();
  const newDateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  }

  headerDate.innerHTML = `
    ${newDate.toLocaleDateString('tr-TR', newDateOptions)}
  `;

};

const setTasksIntoLocalStorage = () => {

  let tasks = JSON.parse(localStorage.getItem('tasks'));

  if (!tasks) {
    localStorage.setItem('tasks', JSON.stringify([]));
  } else {
    tasks.forEach(task => {
      createElements(task)
    });
  }
}


createElements = (task) => {
  const li = document.createElement('li');
  li.className = "task-item";

  const p = document.createElement('p');
  p.className = "task-value";
  p.textContent = task.value;

  if (task.isDone) {
    p.classList.add('done')
  }

  li.appendChild(p);

  const doneButton = document.createElement('button');
  doneButton.className = "button button-done";
  doneButton.innerHTML = checkIcon;

  doneButton.addEventListener('click', doneTask);


  li.appendChild(doneButton);
  
  const deleteButton = document.createElement('button');
  deleteButton.className = "button button-delete";
  deleteButton.innerHTML = deleteIcon;
  deleteButton.addEventListener('click', deleteTask);

  li.appendChild(deleteButton);

  toDoList.appendChild(li);

}

createError = () => {

  const div = document.createElement('div');
  div.className = "error";
  div.innerText = "Please enter task name"
  div.style = "margin-top: 15px;"
  
  formContainer.appendChild(div)

  setTimeout(() => {
    div.remove();
  }, 2000);
}

const addTask = () => {

  const task = {
    value: '',
    isDone: false
  }

  

  formInput.addEventListener('keypress', (event) => {

    if (event.keyCode == 13) {
      
      if (formInput.value == '') {
        createError();
      } else {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        task.value = formInput.value.trim();
        
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks))
        formInput.value = '';
        createElements(task)
      }

    }

  })

}

const doneTask = (event) => {
  // const doneButton = event.target;
  const targetTask = event.target.previousSibling;
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  

  tasks.forEach(task => {
    if (targetTask.textContent == task.value) {
        task.isDone = true;
        targetTask.classList.add('done')
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))  
}

const deleteTask = (event) => {
  const deleteButton = event.target;
  const deleteListItem = event.target.parentElement;
  const deleteTask = deleteButton.previousSibling.previousSibling;

  let tasks = JSON.parse(localStorage.getItem('tasks'))

  tasks.forEach((task,index) => {
    if (deleteTask.textContent == task.value) {
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
  deleteListItem.remove();
}



addCurrentDateInHeader();
addTask();
setTasksIntoLocalStorage();