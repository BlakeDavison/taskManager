app.controller('taskCtrl', function($scope, sVars, $http)
{
  let URL_ROOT = sVars.getURL();
//list the different ways to sort the list
  $scope.views = ["name", "project",  "due"];
  $scope.prj = sVars.getPrj();
  $scope.showForm = false;
  $scope.sprintlistT = sVars.getSP();
  $scope.tasklist = sVars.getTL();
  $http.get(URL_ROOT + '/api/v1/tasks/users').
    then(function(res){
      $scope.tasklist = res.data.task;
    });
  $http.get(URL_ROOT + '/api/v1/sprints/users').
    then(function(res){
      $scope.sprintlistT = res.data.sprint;
    });
    $http.get(URL_ROOT + '/api/v1/projects/users').
      then(function(res){
        $scope.prj = res.data.project;
      });
  $scope.addTask = function()
  {
    var idNum = $scope.tasklist.length;
    //
    var prjHold = "000000000000000000000001";
    if($scope.selectedProject){prjHold=$scope.selectedProject._id;}
    var sptHold = "000000000000000000000001";
    if($scope.selectedSprint){prjHold=$scope.selectedSprint.name;}
    $http.post(URL_ROOT + '/api/v1/tasks', JSON.stringify({name:$scope.formNewTask1, project:prjHold, id:idNum, sprint:sptHold, due:$scope.duedate}));
    $http.get(URL_ROOT + '/api/v1/tasks/users').
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
    $http.put(URL_ROOT + '/api/v1/tasks/done', JSON.stringify(data));
    $http.get(URL_ROOT + '/api/v1/tasks/users').
      then(function(res)
      {//update tasklist
        $scope.tasklist = res.data.task;
      });
  };
  $scope.nDone = function(data)
  {
    $http.put(URL_ROOT + '/api/v1/tasks/ndone', JSON.stringify(data));
    $http.get(URL_ROOT + '/api/v1/tasks/users').
      then(function(res)
      {//update tasklist
        $scope.tasklist = res.data.task;
      });
  };
  $scope.gone = function(a)
  {
    var r = confirm("Do you want to delete "+a.name+"?");
    if(r)
    {
      var hold = JSON.stringify(a);
      $http(
      {
        method: 'DELETE',
        url: URL_ROOT + '/api/v1/tasks',
        data: JSON.stringify(a),
        headers: {'Content-Type': 'application/json;charset=utf-8'}
      })
      $http.get(URL_ROOT + '/api/v1/tasks/users').
        then(function(res)
        {//update tasklist
          $scope.tasklist = res.data.task;
        });
    }
  };
});
