var tasks = require('./../elasticSearch/elasticSearch').tasks;

exports.elasticSync = function(task) {
  return new Promise(function(resolve, reject) {
    switch(task.action) {
      case 'add':
        tasks.setTask(task.workspaceId, task.taskId, task.payload);
        resolve();
        break;

      case 'change':
        tasks.updateTask(task.workspaceId, task.taskId, task.payload);
        resolve();
        break;

      case 'delete':
        tasks.removeTask(task.workspaceId, task.taskId);
        resolve();
        break;

      default:
        reject();
    }
  });
}
