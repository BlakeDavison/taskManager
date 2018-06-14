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
    //
    var prjHold = "000000000000000000000001";
    if($scope.selectedProject){prjHold=$scope.selectedProject._id;}
    var sptHold = "000000000000000000000001";
    if($scope.selectedSprint){prjHold=$scope.selectedSprint.name;}
    $http.post('http://localhost:3000/api/v1/tasks',JSON.stringify({name:$scope.formNewTask1, project:prjHold, id:idNum, sprint:sptHold, due:$scope.duedate}));
    $http.get('http://localhost:3000/api/v1/tasks').
      then(function(res){//get the new tasklist
        $scope.tasklist = res.data.task;
      });
    //reset the values
    $scope.formNewTask1 = "";
    $scope.selectedProject = "";
  };
  $scope.emptyComplete = function()
  {
    var data = $scope.tasklist.filter(function(task)
    {
      return task.done;
    });
    $http.put('http://localhost:3000/api/v1/tasks/done', JSON.stringify(data)).
    then(function(res){console.log(res);});
    $http.get('http://localhost:3000/api/v1/tasks').
      then(function(res)
      {//update tasklist
        $scope.tasklist = res.data.task;
      });
  };
  $scope.nDone = function(a)
  {
    $http.put('http://localhost:3000/api/v1/tasks/ndone', JSON.stringify(a)).
    then(function(res){console.log(res);});
    $http.get('http://localhost:3000/api/v1/tasks').
      then(function(res)
      {//update tasklist
        $scope.tasklist = res.data.task;
      });
  };
  $scope.gone = function(a)
  {
    var r = confirm("Do you want to delete "+a.name+"?");
    if(r){
      var hold = JSON.stringify(a);
      console.log(hold);
      $http(
      {
        method: 'DELETE',
        url: 'http://localhost:3000/api/v1/tasks',
        data: JSON.stringify(a),
        headers: {'Content-Type': 'application/json;charset=utf-8'}
      })
      $http.get('http://localhost:3000/api/v1/tasks').
        then(function(res)
        {//update tasklist
          $scope.tasklist = res.data.task;
        });
    }
  };
});

// app.directive('taskList', function(){
//   return{
//     restrict: 'E',
//     templateUrl: 'template/task-list.html'
//   }
// });
