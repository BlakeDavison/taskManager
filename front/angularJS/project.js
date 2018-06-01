app.controller('projectCtrl', function($scope, sVars){
  $scope.prj = sVars.getPrj();
  $scope.tlist = sVars.getTL();
});

app.directive('projectList', function(){
  return{
    restrict: 'E',
    templateUrl: 'template/project-list.html'
  }
});
