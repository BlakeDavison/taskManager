var app = angular.module('pma',['ngRoute']).service('sVars', function(){
  var projects = [{name:"b", id:0}, {name:"z",id:1}, {name:"test",id:2}];
  var tasks = [{name:"test1", project:"z", sprint:""}, {name:"test2", project:"b", sprint:""}];
  var sprints = [{name:"sprint1", project:"b"}, {name:"sprint2", project:"z"}];

  return{
    //setters and getters
    getPrj: function () {
      return projects;
    },
    setPrj: function(v) {
      projects = v;
    },
    getVar: function(){
      return vari;
    },
    setVar: function(v){
      vari = v;
    },
    getTL: function(){
      return tasks;
    },
    setTL: function(v){
      tasks = v;
    },
    getSP: function(){
      return sprints;
    },
    setSP: function(v){
      sprints = v;
    }
  };
});

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: './template/task-list.html',
      controller: 'taskCtrl'
    })
    .when('/project', {
      templateUrl: './template/project-list.html',
      controller: 'projectCtrl'
    });
});
