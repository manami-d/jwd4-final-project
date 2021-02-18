const assert = require('assert');
const TaskManager = require('../JS/taskManager');
describe('TaskManager', () => {
  describe('.addTask()', () => {
    it('should return newly added task', () => {
      const task = new TaskManager();
      task.addTask('cleaning', 'cleaning the house', 'manami', '2021-02-23', '2021-02-20', 'In Progress', 3);
      const result = task.tasks;
      const expected = [ { 
        Id: 1,
        name: 'cleaning',
        description:'cleaning the house' ,
        assignedTo: 'manami',
        dueDate: '2021-02-23',
        createdDay: '2021-02-20',
        status: 'In Progress',
        rating: 3
    } ];
      assert.deepStrictEqual(result, expected);
      
    });
  });

  describe('.deleteTask()', () => {
    it('should delete selected task', () => {
      const task = new TaskManager();
      task.addTask('cleaning', 'cleaning the house', 'manami', '2021-02-23', '2021-02-20', 'In Progress', 3);
      task.addTask('cleaning1', 'cleaning the house', 'manami', '2021-02-23', '2021-02-20', 'In Progress', 3);
      task.addTask('cleaning2', 'cleaning the house', 'manami', '2021-02-23', '2021-02-20', 'In Progress', 3);
      task.deleteTask(2);
      console.log(task.tasks);
      assert.deepStrictEqual(task.tasks, [{
        Id:1,
        name: 'cleaning',
        description: 'cleaning the house',
        assignedTo: 'manami',
        dueDate: '2021-02-23',
        createdDay: '2021-02-20',
        status: 'In Progress',
        rating: 3
      }, { 
      Id:3,
      name: 'cleaning2',
      description: 'cleaning the house',
      assignedTo: 'manami',
      dueDate: '2021-02-23',
      createdDay: '2021-02-20',
      status: 'In Progress',
      rating: 3
      }]);
    });
  });

  describe('.getTaskById()', () => {
    it('should return the task identified by its Id', () => {
      const task = new TaskManager();
      const getTask = {
        Id: task.currentId,
        name: 'cleaning',
        description: 'cleaning the house',
        assignedTo: 'manami',
        dueDate: '2021-02-23',
        createdDay: '2021-02-20',
        status: 'In Progress',
        rating: 3,
    };
    task.addTask (
      getTask.name,
      getTask.description,
      getTask.assignedTo,
      getTask.dueDate,
      getTask.createdDay,
      getTask.status,
      getTask.rating
    );
      const result = task.getTaskById(1);
      const expected = 1;
      assert.strictEqual(result[0].Id, expected);
    });
  });
});