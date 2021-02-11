const taskApp = new TaskManager();
const formValidator = document.querySelector('#todo-form');
const taskInput = document.querySelector('#InputTaskName');
const taskDesc = document.querySelector('#InputTaskDescription');
const taskDueDate = document.querySelector('#duedate');
const taskAssign = document.querySelector('#assigned-name');
const taskStatus = document.querySelector('#task-status');
let rate = 0;

// Disable selection of date prior to today's date in html date selector
const todayInput = new Date().toLocaleDateString();
console.log(todayInput);
const splitDate = todayInput.split('/');
if (splitDate[0] < 10) { splitDate[0] = `0${splitDate[0]}`; }
if (splitDate[1] < 10) { splitDate[1] = `0${splitDate[1]}`; }
const today = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
document.getElementById('duedate').setAttribute('min', today);
console.log(today);

// let date1 = new Date(Date.now());
// const todayTry1 = date1.getFullYear() + "/" + (date1.getMonth() + 1) + "/" + date1.getDate();
// document.getElementById('duedate').setAttribute('min', todayTry1);
// console.log(todayInput);
// console.log(today);

// getting the rating value from user
document.forms.todoform.stars.forEach((radio) => {
    radio.addEventListener('change', () => {
        rate = document.forms.todoform.stars.value;
    });
});

// function to validate task name, description and asignned-to input from user,
// minimum 5 characters.
const validFormFieldInput = (data) => {
    if (data.value.length < 5) {
        data.classList.add('is-invalid');
        data.classList.remove('is-valid');
    } else {
        data.classList.add('is-valid');
        data.classList.remove('is-invalid');
    }
};

const clearForm = () => {
    formValidator.reset();
    taskInput.classList.remove('is-valid');
    taskDesc.classList.remove('is-valid');
    taskAssign.classList.remove('is-valid');
};

// Validating inputs & selection from user
formValidator.addEventListener('submit', (event) => {
    event.preventDefault();
    validFormFieldInput(taskInput);
    validFormFieldInput(taskDesc);
    validFormFieldInput(taskAssign);
    if (taskInput.classList.contains('is-valid') && taskDesc.classList.contains('is-valid') && taskAssign.classList.contains('is-valid')) {
        taskApp.addTask(taskInput.value, taskDesc.value, taskAssign.value, taskDueDate.value, today, taskStatus.value, rate);
        console.log(taskApp);
        taskApp.render();
        clearForm();
    }
});

const taskList = document.querySelector('#taskOutput');

taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        const findId = Number(parentTask.attributes['data-task-id'].value);
        console.log(parentTask);
        console.log(`Id to find: ${findId}`);
        const task = taskApp.getTaskById(findId);
        console.log(task);
        task[0].status = 'Completed';

        taskApp.render();
    }
});
