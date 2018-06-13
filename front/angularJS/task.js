app.controller('taskCtrl', function($scope, sVars, $http)
{
//list the different ways to sort the list
  $scope.views = ["name", "project",  "due"];
  $scope.prj = sVars.getPrj();
  $scope.showForm = false;
  $scope.sprintlistT = sVars.getSP();
  $scope.tasklist = sVars.getTL();
  $http.get('http://localhost:3000/api/v1/tasks').
    then(function(res){
      $scope.tasklist = res.data.task;
    });
  $http.get('http://localhost:3000/api/v1/sprints').
    then(function(res){
      $scope.sprintlistT = res.data.sprint;
    });
  $scope.addTask = function()
  {
    var idNum = $scope.tasklist.length;
    var prjHold = "unas";
    if($scope.selectedProject){prjHold=$scope.selectedProject.name;}
    var sptHold = "unas";
    if($scope.selectedSprint){prjHold=$scope.selectedSprint.name;}
    $http.post('http://localhost:3000/api/v1/tasks',JSON.stringify({name:$scope.formNewTask1, project:prjHold, id:idNum, sprint:sptHold, due:$scope.duedate})).then(function(nTL){
      $scope.tasklist = nTL;
    });

    //reset the values
    $scope.formNewTask = "";
    $scope.selectedProject = "";
    sVars.setTL($scope.tasklist);
  };
  $scope.emptyComplete = function()
  {
    $scope.tasklist = $scope.tasklist.filter(function(task)
    {
      return !task.done;
    });
    sVars.setTL($scope.tasklist);
    $scope.selectedProject = '';
  };
});

// app.directive('taskList', function(){
//   return{
//     restrict: 'E',
//     templateUrl: 'template/task-list.html'
//   }
// });
