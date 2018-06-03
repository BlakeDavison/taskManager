app.controller('projectCtrl', function($scope, sVars){
  $scope.prj = sVars.getPrj();
  $scope.tlist = sVars.getTL();
  $scope.showNPrj = false;
  $scope.whichForm = 0;
  $scope.addT = function(t, p)
  {
    var tID = $scope.tlist.length;
    $scope.tlist.push({name:t, project:p, id:tID});
    //reset the value
    $scope.formNewT = "";
    sVars.setTL($scope.tasklist);
  };
  $scope.addP = function(v)
  {
    var pID = $scope.prj.length;
    $scope.prj.push({name:v, id:pID});
    sVars.setPrj($scope.prj);
  }
});

app.directive('projectList', function(){
  return{
    restrict: 'E',
    templateUrl: 'template/project-list.html'
  }
});
