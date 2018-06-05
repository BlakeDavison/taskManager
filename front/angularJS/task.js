app.controller('taskCtrl', function($scope, sVars)
{
//list the different ways to sort the list
  $scope.views = ["name", "project",  "due"];
  $scope.prj = sVars.getPrj();
  $scope.showForm = false;
  $scope.tasklist = sVars.getTL();
  $scope.sprintlistT = sVars.getSP();
  $scope.addTask = function()
  {
    var idNum = $scope.tasklist.length;
    $scope.tasklist.push({name:$scope.formNewTask, project:$scope.selectedProject.name, id:idNum, sprint:$scope.selectedSprint, due:$scope.duedate});
    //reset the values
    $scope.formNewTask = "";
    $scope.selectedProject = "";
    sVars.setTL($scope.tasklist);
    console.log($scope.duedate);
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
