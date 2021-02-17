const assert = require('assert');
const TaskManager = require('../JS/taskManager');
describe('TaskManager', () => {
  describe('.addTask()', () => {
    it('should return', () => {
      const task = new TaskManager();
      const result = task.addTask('cleaning', 'cleaning the house', 'manami', '2021-02-23', '2021-02-20', 'In Progress', 3);
      const expected = {
        Id: 1,
        name: 'cleaning',
        description:'cleaning the house' ,
        assignedTo: 'manami',
        dueDate: '2021-02-23',
        createdDay: '2021-02-20',
        status: 'In Progress',
        rating: 3
    };
      expect(result).to.eql(expected);
    });
  });

  // describe('.deleteTask()', () => {
  //   it('should return -', () => {
  //     const task = new TaskManager();

  //     assert.equal([1, 2, 3].indexOf(4), -1);
  //   });
  // });

  // describe('.getTaskById()', () => {
  //   it('should return ', () => {
  //     const task = new TaskManager();

  //     assert.equal([1, 2, 3].indexOf(4), -1);
  //   });
  // });
});