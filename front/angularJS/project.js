app.controller('projectCtrl', function($scope, sVars){
  $scope.prj = sVars.getPrj();
  $scope.tlist = sVars.getTL();
  $scope.slist = sVars.getSP();
  $scope.myt = {};
  $scope.sptv = {};
  // $scope.form = {};
  $scope.CView = ["Project", "Sprint"];
  $scope.addT = function(t, p, i)
  {//adds task
    var tID = $scope.tlist.length;
    $scope.tlist.push({name:t, project:p, id:tID});
    //reset the value
    $scope.myt[i] = '';
    console.log($scope.tlist);
    sVars.setTL($scope.tlist);
  };
  $scope.addTas = function(t, p, s, si)
  {//adds task
    var tID = $scope.tlist.length;
    $scope.tlist.push({name:t, project:p, id:tID, sprint:s});
    $scope.sptv[si] = "";
    sVars.setTL($scope.tlist);
  };
  $scope.clearlist = function()
  {
    $scope.tlist = $scope.tlist.filter(function(task)
    {
      return !task.done;
    });
      sVars.setTL($scope.tlist);
  };
  $scope.deleteSprint = function(v)
  {
    var a = confirm("Delete " + v + " with all Tasks");
    if (a)
    {
      $scope.tlist = $scope.tlist.filter(function(c)
      {
        return c.sprint != v;
      });
      $scope.slist = $scope.slist.filter(function(b)
      {
        return b.name != v;
      });
      sVars.setTL($scope.tlist);
      sVars.setSP($scope.slist);
    }
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
