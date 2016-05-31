var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyBqno00wkQN-PUpl94Fe4iPkrI-vHLwMx4",
  authDomain: "elasticsearch-rel-84d2e.firebaseapp.com",
  databaseURL: "https://elasticsearch-rel-84d2e.firebaseio.com",
  storageBucket: "elasticsearch-rel-84d2e.appspot.com",
  serviceAccount: "elasticsearch-rel-f9edbe0f2ef7.json"
};

firebase.initializeApp(config);

var workerIndexTasks = require('./src/workers/indexTasks').workerIndexTasks;
var workerQueryTasks = require('./src/workers/queryTasks').workerQueryTasks;

workerIndexTasks();
workerQueryTasks();