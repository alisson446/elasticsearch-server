var elasticsearch = require('elasticsearch');

const client = elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

//params {
//  title - string,
//  dueDate - number,
//  startDate - number,
//  tags[],
//  teams[],
//  followers[],
//  assignees[],
//  permissions[]
//}

/**
 * tasks
 */
const typeTask = 'tasks';

const tasks = {
  setTask: (workspaceId, taskId, payload) => { 
    client.create({
      index: workspaceId,
      type: typeTask,
      id: taskId,
      body: payload
    });
  },
  fetchAllByWorkspace: (workspaceId) => {
    client.search({
      index: workspaceId,
      body: {
        query: {
          match_all: {}
        }
      }
    });
  },
  searchTask: (params) => {
    return new Promise(function(resolve, reject) {
      const workspaceId = params.workspaceId;
      const title = (params.title !== undefined) ? params.title : null;
      const dueDate = (params.dueDate !== undefined) ? params.dueDate : null;
      const startDate = (params.startDate !== undefined) ? params.startDate : null;
      const tags = (params.tags !== undefined) ? params.tags.join() : null;
      const teams = (params.teams !== undefined) ? params.teams.join() : null;
      const followers = (params.followers !== undefined) ? params.followers.join() : null;
      const assignees = (params.assignees !== undefined) ? params.assignees.join() : null;
      const permissions = (params.permissions !== undefined) ? params.permissions.join() : null;

      client.search({
        index: workspaceId,
        type: typeTask,
        body: {
          query: {
            bool: {
              must: [
                { match: (title) ? { "title": title } : undefined },
                { match: (dueDate) ? { "dueDate": dueDate } : undefined },
                { match: (startDate) ? { "startDate": startDate } : undefined },
                { match: (tags) ? { "tags": tags } : undefined },
                { match: (teams) ? { "teams": teams } : undefined },
                { match: (followers) ? { "followers": followers } : undefined },
                { match: (assignees) ? { "assignees": assignees } : undefined },
                { match: (permissions) ? { "permissions": permissions } : undefined },
              ]
            }
          }
        }   
      }, function(error, response) {
        if(!error) { resolve(response.hits.hits); }
        else { reject(); }
      });
    });
  },
  updateTask: (workspaceId, taskId, payload) => {
    client.update({
      index: workspaceId,
      type: typeTask,
      id: taskId,
      body: {
        doc: payload
      }
    });
  },
  removeTask: (workspaceId, taskId) => {
    client.delete({
      index: workspaceId,
      type: typeTask,
      id: taskId
    });
  }
};

module.exports = {
  tasks: tasks
};

