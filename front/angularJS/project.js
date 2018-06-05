app.controller('projectCtrl', function($scope, sVars){
  $scope.prj = sVars.getPrj();
  $scope.tlist = sVars.getTL();
  $scope.slist = sVars.getSP();
  $scope.myt = {};
  // $scope.form = {};
  $scope.showNPrj = false;
  $scope.CView = ["Project", "Sprint"];
  $scope.addT = function(t, p, i)
  {//adds task
    var tID = $scope.tlist.length;
    $scope.tlist.push({name:t, project:p, id:tID});
    //reset the value
    $scope.myt[i] = '';
    sVars.setTL($scope.tasklist);
  };
  $scope.addTas = function(t, p, s)
  {//adds task
    var tID = $scope.tlist.length;
    $scope.tlist.push({name:t, project:p, id:tID, sprint:s});
    //reset the value
    $scope.test123.$setPristine();
    sVars.setTL($scope.tasklist);
  };
  $scope.addP = function(v)
  {//add project
    var pID = $scope.prj.length;
    $scope.prj.push({name:v, id:pID});
    sVars.setPrj($scope.prj);
    $scope.NewProj1 = "";
  };
  $scope.addS = function(s,p)
  {
    var sID = $scope.slist.length;
    $scope.slist.push({name:s, project:p, id:sID});
    $scope.NewSpt1 = "";
    sVars.setSP($scope.slist);
  };
});

// app.directive('projectList', function(){
//   return{
//     restrict: 'E',
//     templateUrl: 'template/project-list.html'
//   }
// });
