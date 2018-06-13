app.controller('projectCtrl', function($scope, sVars, $http){
  $scope.prj = sVars.getPrj();
  $scope.tlist = sVars.getTL();
  $scope.slist = sVars.getSP();
  $http.get('http://localhost:3000/api/v1/tasks').
    then(function(res){
      $scope.tlist = res.data.task;
    });
  $http.get('http://localhost:3000/api/v1/sprints').
    then(function(res){
      $scope.slist = res.data.sprint;
    });
  $http.get('http://localhost:3000/api/v1/projects').
    then(function(res){
      $scope.prj = res.data.project;
    });
  $scope.myt = {};
  $scope.sptv = {};
  $scope.addToSpt = {};
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
  $scope.deleteP = function(name)
  {
    var a = confirm("Delete Project " + name + " and all it Sprints and Tasks?");
    if (a)
    {
      $scope.tlist = $scope.tlist.filter(function(task)
      {//remove all tasks for the project
        return task.project != name;
      });
      $scope.slist = $scope.slist.filter(function(sprint)
      {//remove all sprints for the project
        return sprint.project != name;
      });
      $scope.prj = $scope.prj.filter(function(project)
      {//delete the project
        return project.name != name;
      });
      sVars.setTL($scope.tlist);
      sVars.setSP($scope.slist);
      sVars.setPrj($scope.prj);
    }
  };
  $scope.changeSpt = function(v)
  {
    var index = $scope.tlist.indexOf(v);
    $scope.tlist[index].sprint = $scope.addToSpt[v.id].name;
    sVars.setTL($scope.tlist);
  }
});

// app.directive('projectList', function(){
//   return{
//     restrict: 'E',
//     templateUrl: 'template/project-list.html'
//   }
// });
