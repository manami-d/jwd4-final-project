const createTaskHtml = (name, description, assignedTo, dueDate, createdDay, status, rating) => {
  const html = `  
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
                    <li class="list-group-item">${createdDay}</li>
                    <li class="list-group-item">${dueDate}</li>
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
  `;
  return html;
}
class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
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