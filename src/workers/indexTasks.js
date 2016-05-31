var firebase = require('firebase');
var Queue = require('firebase-queue');
var elasticSync = require('./../controler/tasks').elasticSync;

var queueRef = firebase.database().ref('_indexTasks');

var options = {
  'numWorkers': 4,
};

exports.workerIndexTasks = function() {
  var queue = new Queue(queueRef, options, function(data, progress, resolve, reject) {
    elasticSync(data).then(function() {
      progress(100);
      resolve();
    }).catch(function() {
      reject();
    });
  });
};