app.controller('taskCtrl', function($scope, sVars)
{
//list the different ways to sort the list
  $scope.views = ["name", "project"];
  $scope.prj = sVars.getPrj();
  $scope.showForm = false;
  $scope.tasklist = sVars.getTL();
  $scope.addTask = function()
  {
    $scope.tasklist.push({name:$scope.formNewTask, project:$scope.selectedProject.name});
    //reset the values
    $scope.formNewTask = "";
    $scope.forProject = "";
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

app.directive('taskList', function(){
  return{
    restrict: 'E',
    templateUrl: 'template/task-list.html'
  }
});
