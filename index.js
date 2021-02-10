const formValidator = document.querySelector('#todo-form');
const taskInput = document.querySelector('#InputTaskName');
const taskDesc = document.querySelector('#InputTaskDescription');
const taskDueDate = document.querySelector('#duedate');
const taskAssign = document.querySelector('#assigned-name');
const taskStatus = document.querySelector('#task-status');
let rate = 0;

// Disable selection of date prior to today's date in html date selector
const today = new Date().toISOString().slice(0, 10);
document.getElementById('duedate').setAttribute('min', today);

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

// Validating inputs & selection from user
formValidator.addEventListener('submit', (event) => {
    event.preventDefault();
    validFormFieldInput(taskInput);
    validFormFieldInput(taskDesc);
    validFormFieldInput(taskAssign);
    document.querySelector('#output').innerHTML = `
    Task Name : ${taskInput.value} <br>
    Task Description : ${taskDesc.value} <br>
    Today's Date: ${today} <br>
    Task Date : ${taskDueDate.value} <br>
    Assigned To : ${taskAssign.value} <br>
    Task Status : ${taskStatus.value} <br>
    Task Rating : ${'⭐️'.repeat(rate)} <br>
    `;
    // console.log(taskAssign.value);
    // console.log(taskDueDate.value);
    // console.log(taskDesc.value);
    // console.log(taskInput.value);
    // console.log(taskStatus.value);
    // console.log(rate);
});
