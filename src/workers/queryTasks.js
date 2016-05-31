var firebase = require('firebase');
var Queue = require('firebase-queue');
var searchTask = require('./../elasticSearch/elasticSearch').tasks.searchTask;

var firebaseRef = firebase.database().ref();
var queueRef = firebase.database().ref('_queryTasks');

var options = {
  'numWorkers': 4,
};

exports.workerQueryTasks = function() {
  var queue = new Queue(queueRef, options, function(data, progress, resolve, reject) {
    searchTask(data).then(function(response) {
      const tasksQuery = {};

      response.forEach(function(childResponse) {
        tasksQuery[childResponse._id] = true;
      });

      firebaseRef.child('_queryResults').set(tasksQuery, function(error) {
        if(!error) {
          progress(100); 
          resolve(); 
        }else {
          reject();
        }
      });
    }).catch(function() {
      reject();
    });
  });
};