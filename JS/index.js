let taskApp = new TaskManager();
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

const clearForm = () => {
  formValidator.reset(); 
  taskInput.classList.remove('is-valid');
  taskDesc.classList.remove('is-valid');
  taskAssign.classList.remove('is-valid');
}

// Validating inputs & selection from user
formValidator.addEventListener('submit', (event) => {
    event.preventDefault();
    validFormFieldInput(taskInput);
    validFormFieldInput(taskDesc);
    validFormFieldInput(taskAssign);
    if (taskInput.classList.contains('is-valid') && taskDesc.classList.contains('is-valid') && taskAssign.classList.contains('is-valid')) {
        document.querySelector('#output').innerHTML = `
        Task Name : ${taskInput.value} <br>
        Task Description : ${taskDesc.value} <br>
        Today's Date: ${today} <br>
        Task Date : ${taskDueDate.value} <br>
        Assigned To : ${taskAssign.value} <br>
        Task Status : ${taskStatus.value} <br>
        Task Rating : ${'⭐️'.repeat(rate)} <br>
        `;
        taskApp.addTask(taskInput.value, taskDesc.value, taskAssign.value, taskDueDate.value, taskStatus.value, rate)
        console.log(taskApp)
        
        clearForm();
    }
    // console.log(taskAssign.value);
    // console.log(taskDueDate.value);
    // console.log(taskDesc.value);
    // console.log(taskInput.value);
    // console.log(taskStatus.value);
    // console.log(rate);    
});


// Step 4: Adding Tasks With The Form
// In this final step, we will use the TaskManager class to keep track of tasks we add with the New Task form.

// Useful Resources for this step
// Document.querySelector()
// EventTarget.addEventListener()
// Event Reference
// preventDefault
// Make sure a new TaskManager is initialized at the top of the file.
// In index.js using the eventListener created for the form validation, create some logic to ensure the following events only happen if all the inputs are valid.
// When the submit event fires, call the taskManager's addTask method passing in your form's input.
// Note: Make sure to prevent the default action of the form!
// Clear the values from each form input, ready for the next submission.
 
