const taskApp = new TaskManager();
taskApp.load();
taskApp.render();
const formValidator = document.querySelector('#todo-form');
const taskInput = document.querySelector('#InputTaskName');
const taskDesc = document.querySelector('#InputTaskDescription');
const taskDueDate = document.querySelector('#duedate');
const taskAssign = document.querySelector('#assigned-name');
const taskStatus = document.querySelector('#task-status');
let rate = 1;
let selectedId = 0;

// Disable selection of date prior to today's date in HTML date selector
const todayInput = new Date();
let todayDay = todayInput.getDate().toString();
let todayMonth = (todayInput.getMonth() + 1).toString();
const todayYear = todayInput.getFullYear().toString();
if (todayDay.length < 2) { todayDay = `0${todayDay}`; }
if (todayMonth.length < 2) { todayMonth = `0${todayMonth}`}; 
const today = `${todayYear}-${todayMonth}-${todayDay}`;
document.getElementById('duedate').setAttribute('min', today);

// Method to validate date input 
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

// Validating user input date and format 
const validateDate = (dateString) => {
    const tdyDate = new Date(today);
    const inDate = new Date(dateString.value);
    if (isValidDate(dateString.value) && +inDate >= +tdyDate) {
        dateString.classList.add('is-valid');
        dateString.classList.remove('is-invalid');
    } else {
        dateString.classList.add('is-invalid');
        dateString.classList.remove('is-valid');
    }
};

// Getting the rating value from user
document.forms.todoform.stars.forEach((radio) => {
    radio.addEventListener('change', () => {
        rate = document.forms.todoform.stars.value;
    });
});

// Function to validate task name, description and assigned-to input from user
// Minimum 5 characters.
const validFormFieldInput = (data) => {
    if (data.value.length < 5) {
        data.classList.add('is-invalid');
        data.classList.remove('is-valid');
    } else {
        data.classList.add('is-valid');
        data.classList.remove('is-invalid');
    }
};

// Method to clear the form 
const clearForm = () => {
    formValidator.reset();
    taskInput.classList.remove('is-valid');
    taskDesc.classList.remove('is-valid');
    taskAssign.classList.remove('is-valid');
    taskDueDate.classList.remove('is-valid');
};

// Update or add task input from user if valid
formValidator.addEventListener('submit', (event) => {
    event.preventDefault();
    validFormFieldInput(taskInput);
    validFormFieldInput(taskDesc);
    validFormFieldInput(taskAssign);
    validateDate(taskDueDate);
    if (taskInput.classList.contains('is-valid') && taskDesc.classList.contains('is-valid') && taskAssign.classList.contains('is-valid') && taskDueDate.classList.contains('is-valid')) {
        // Add new task if button is inner text is "Add!" otherwise perform an update
        if (document.querySelector("#add-task").innerText === "Add!") {
            taskApp.addTask(taskInput.value, taskDesc.value, taskAssign.value, taskDueDate.value, today, taskStatus.value, rate);
        } else {
            const task = taskApp.getTaskById(selectedId);
            task[0].name = taskInput.value;
            task[0].description = taskDesc.value;
            task[0].assignedTo = taskAssign.value;
            task[0].dueDate = taskDueDate.value;
            task[0].status = taskStatus.value;
            task[0].rating = rate; 
            document.getElementById("add-task").innerHTML = "Add!";
            document.getElementById("title").innerHTML = "Create a New Task";
        }
        taskApp.save();
        taskApp.render();
        clearForm();
    }
});

const taskList = document.querySelector('#taskOutput');

// Event listener to complete, delete and edit the task cards
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        const findId = Number(parentTask.attributes['data-task-id'].value);
        const task = taskApp.getTaskById(findId);
        task[0].status = 'Completed';
        taskApp.save();
        taskApp.render();
    }
    if (event.target.classList.contains('delete-button')){
        const parentTask = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        const findId = Number(parentTask.attributes['data-task-id'].value);
        taskApp.deleteTask(findId);
        taskApp.save();
        taskApp.render();
    }
    if (event.target.classList.contains('edit-button')){
        const parentTask = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        const findId = Number(parentTask.attributes['data-task-id'].value);
        selectedId = findId; 
        const task = taskApp.getTaskById(findId);
        taskApp.updateTask(task);
        document.getElementById("add-task").innerHTML = "Update!";
        document.getElementById("title").innerHTML = "Edit Existing Task";
        taskApp.save();
        taskApp.render();
    }
});
