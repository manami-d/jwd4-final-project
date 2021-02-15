const createTaskHtml = (id, name, description, assignedTo, dueDate, createdDay, status, rating) => {
    const html = `  
      <div class="col-lg-12 col-xl-6 my-3 d-flex justify-content-center">
        <div class="card" data-task-id="${id}" style="max-width: 30rem;">
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${description}</p>
                    <p class="card-text">${assignedTo}</p>
                </div>
                <div class="col-6 text-end">
                    <h5>${'⭐'.repeat(rating)}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Created : ${createdDay}</li>
                        <li class="list-group-item">Due Date : ${dueDate}</li>
                    </ul>
                </div>
                <div class="card-footer bg-primary text-light">
                  <div class="row">
                    <div class="col-6">
                      <i class="fa fa-hourglass fa-sm">
                        <span class="d-inline fs-5">
                          ${status}
                        </span>
                      </i>
                    </div>
                    <div class="col-6 text-end">
                      <button class="${status === 'Completed' ? 'invisible' : 'btn btn-primary done-button'}"><i class="fa fa-check fa-sm" style="pointer-events: none;">&nbsp;&nbsp;</i></button>
                      <button class="btn btn-primary"><i class="fa fa-pencil fa-sm" style="pointer-events: none;">&nbsp;&nbsp;</i></button>
                      <button class="btn btn-primary delete-button"><i class="fa fa-trash fa-sm" style="pointer-events: none;">&nbsp;&nbsp;</i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  `;
    return html;
};
class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    render() {
        const tasksHtmlList = [];
        const tasksList = document.querySelector('#taskOutput');
        const imgTag = document.querySelector('#relax');
        console.log(imgTag);
        if (this.tasks.length === 0) {
            tasksList.innerHTML = '';
            document.querySelector('#taskLabel').innerHTML = 'No Outstanding Tasks';
            const randomPicture = `TaskPlannerBg${Math.floor(Math.random() * 4)}.jpg`;
            imgTag.src = `./Images/${randomPicture}`;
            imgTag.classList.add('d-block');
            imgTag.classList.remove('d-none');
        } else {
            imgTag.classList.add('d-none');
            imgTag.classList.remove('d-block');
            document.querySelector('#taskLabel').innerHTML = 'Outstanding Tasks';
            this.tasks.forEach((item) => {
                const formattedCreatedDate = item.createdDay.split('-').reverse().join('-');
                const formattedDueDate = item.dueDate.split('-').reverse().join('-');
                const taskHtml = createTaskHtml(item.Id, item.name, item.description, item.assignedTo, formattedDueDate, formattedCreatedDate, item.status, item.rating);
                tasksHtmlList.push(taskHtml);
            });
            const tasksHtml = tasksHtmlList.join('\n');
            tasksList.innerHTML = tasksHtml;
        }
    }

    addTask(name, description, assignedTo, dueDate, createdDay, status, rating) {
        this.currentId++;
        const task = {
            Id: this.currentId,
            name,
            description,
            assignedTo,
            dueDate,
            createdDay,
            status,
            rating,
        };
        this.tasks.push(task);
    }

    getTaskById(taskId) {
        console.log(taskId);
        const foundTask = this.tasks.filter((x) => x.Id === taskId);
        console.log(foundTask);
        return foundTask;
    }

    save() {
        const tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);
        const currentId = String(this.currentId);
        localStorage.setItem('currentId', currentId);
    }

    load() {
        if (localStorage.getItem('tasks')) {
            const tasksJson = localStorage.getItem('tasks');
            this.tasks = JSON.parse(tasksJson);
        }
        if (localStorage.getItem('currentId')) {
            const currentId = localStorage.getItem('currentId');
            this.currentId = Number(currentId);
        }
    }

    deleteTask(taskId) {
        const newTasks = [];
        this.tasks.forEach((item) => {
            console.log(item.Id);
            console.log(taskId);
            if (item.Id !== taskId) {
                console.log('hi im in if');
                newTasks.push(item);
            }
        });
        this.tasks = newTasks;
    }
}
