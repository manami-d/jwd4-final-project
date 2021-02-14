const taskApp = new TaskManager();
const formValidator = document.querySelector('#todo-form');
const taskInput = document.querySelector('#InputTaskName');
const taskDesc = document.querySelector('#InputTaskDescription');
const taskDueDate = document.querySelector('#duedate');
const taskAssign = document.querySelector('#assigned-name');
const taskStatus = document.querySelector('#task-status');
let rate = 1;

// Disable selection of date prior to today's date in html date selector
const todayInput = new Date();
let todayDay = todayInput.getDate().toString();
let todayMonth = (todayInput.getMonth() + 1).toString();
const todayYear = todayInput.getFullYear().toString();
console.log(todayInput);
console.log(`Day: ${todayDay}, Month: ${todayMonth}, Year: ${todayYear}`);
console.log(todayMonth.length);
if (todayDay.length < 2) { todayDay = `0${todayDay}`; }
if (todayMonth.length < 2) { todayMonth = `0${todayMonth}`; }
console.log(`Day: ${todayDay}, Month: ${todayMonth}, Year: ${todayYear}`);
const today = `${todayYear}-${todayMonth}-${todayDay}`;
console.log(today);
document.getElementById('duedate').setAttribute('min', today);

function isValidDate(dateString) {
    // Date format: YYYY-MM-DD
    const datePattern = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
    // Check if the date string format is a match
    const matchArray = dateString.match(datePattern);
    if (matchArray == null) {
        return false;
    }
    // Remove any non digit characters
    const cleanDateString = dateString.replace(/\D/g, '');
    // Parse integer values from date string
    const year = parseInt(cleanDateString.substr(0, 4));
    const month = parseInt(cleanDateString.substr(4, 2));
    const day = parseInt(cleanDateString.substr(6, 2));
    // Define number of days per month
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        daysInMonth[1] = 29;
    }
    // check month and day range
    if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
        return false;
    }
    // You made it through!
    return true;
}
// validating date input
const validateDate = (dateString) => {
    const tdyDate = new Date(today);
    console.log(tdyDate);
    const inDate = new Date(dateString.value);
    console.log(inDate);
    if (+inDate < +tdyDate) {
        console.log('Smalleer!');
    } else {
        console.log('looks ok!!');
    }
    if (isValidDate(dateString.value) && +inDate >= +tdyDate) {
        dateString.classList.add('is-valid');
        dateString.classList.remove('is-invalid');
    } else {
        dateString.classList.add('is-invalid');
        dateString.classList.remove('is-valid');
    }
};

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
    taskDueDate.classList.remove('is-valid');
};

// Validating inputs & selection from user
formValidator.addEventListener('submit', (event) => {
    event.preventDefault();
    validFormFieldInput(taskInput);
    validFormFieldInput(taskDesc);
    validFormFieldInput(taskAssign);
    validateDate(taskDueDate);
    if (taskInput.classList.contains('is-valid') && taskDesc.classList.contains('is-valid') && taskAssign.classList.contains('is-valid') && taskDueDate.classList.contains('is-valid')) {
        taskApp.addTask(taskInput.value, taskDesc.value, taskAssign.value, taskDueDate.value, today, taskStatus.value, rate);
        console.log(taskApp);
        taskApp.save();
        taskApp.render();
        clearForm();
    }
});

const taskList = document.querySelector('#taskOutput');

taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        console.log(event.target);
        const findId = Number(parentTask.attributes['data-task-id'].value);
        console.log(parentTask);
        console.log(`Id to find: ${findId}`);
        const task = taskApp.getTaskById(findId);
        console.log(task);
        task[0].status = 'Completed';
        taskApp.save();
        taskApp.render();
    }
});
