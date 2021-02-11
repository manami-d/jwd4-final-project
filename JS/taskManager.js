const createTaskHtml = (name, description, assignedTo, dueDate, createdDay, status, rating) => {
   const html = `  
   <div class="col-lg-12 col-xl-6 my-3">
      <div class="card" style="max-width: 30rem;">
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
                    <span class="d-none d-lg-inline fs-5">
                      ${status}
                    </span>
                  </i>
                </div>
                <div class="col-6 text-end">
                  <i class="fa fa-check fa-sm">&nbsp;&nbsp;</i>
                  <i class="fa fa-pencil fa-sm">&nbsp;&nbsp;</i>
                  <i class="fa fa-trash fa-sm">&nbsp;&nbsp;</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  `;
  return html;
}
class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }
    render(){
      const tasksHtmlList = [];
      this.tasks.forEach(item => {
        const taskHtml = createTaskHtml(item.name, item.description, item.assignedTo, item.dueDate, item.createdDay, item.status, item.rating)
        tasksHtmlList.push(taskHtml);
        // let date = new Date(item.dueDate);
        // const todayTry = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
        // const formattedDate = new Date(todayTry[0], todayTry[2]-1, todayTry[1])
      })
      const tasksHtml = tasksHtmlList.join('\n');
      const tasksList = document.querySelector("#taskOutput");
      tasksList.innerHTML = tasksHtml;
    }

  

    addTask(name, description, assignedTo, dueDate, createdDay, status, rating) {
        const task = {
            Id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            createdDay: createdDay,
            status: status,
            rating: rating
        } 
        this.tasks.push(task);
    }
}