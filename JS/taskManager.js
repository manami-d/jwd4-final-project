const createTaskHtml = (id, name, description, assignedTo, dueDate, createdDay, status, rating) => {
    const html = `  
      <div class="col-lg-12 col-xl-6 my-3">
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
                      <button class="btn btn-primary done-button"><i class="fa fa-check fa-sm">&nbsp;&nbsp;</i></button>
                      <button class="btn btn-primary"><i class="fa fa-pencil fa-sm">&nbsp;&nbsp;</i></button>
                      <button class="btn btn-primary"><i class="fa fa-trash fa-sm">&nbsp;&nbsp;</i></button>
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
        this.tasks.forEach((item) => {
            const taskHtml = createTaskHtml(item.Id, item.name, item.description, item.assignedTo, item.dueDate, item.createdDay, item.status, item.rating);
            tasksHtmlList.push(taskHtml);
        // let date = new Date(item.dueDate);
        // const todayTry = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
        // const formattedDate = new Date(todayTry[0], todayTry[2]-1, todayTry[1])
        });
        const tasksHtml = tasksHtmlList.join('\n');
        const tasksList = document.querySelector('#taskOutput');
        tasksList.innerHTML = tasksHtml;
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
}
