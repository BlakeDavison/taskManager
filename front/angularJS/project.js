app.controller('projectCtrl', function($scope, sVars, $http){
  let URL_ROOT = sVars.getURL();
  $scope.prj;
  $scope.tlist;
  $scope.slist;
  $http.get(URL_ROOT + '/api/v1/test/get/session').
    then(function(res){
    });
  $http.get(URL_ROOT + '/api/v1/tasks/users').
    then(function(res){
      $scope.tlist = res.data.task;
    });
  $http.get(URL_ROOT + '/api/v1/sprints/users').
    then(function(res){
      $scope.slist = res.data.sprint;
    });
  $http.get(URL_ROOT + '/api/v1/projects/users').
    then(function(res){
      $scope.prj = res.data.project;
    });
  $scope.myt = {};
  $scope.sptv = {};
  $scope.addToSpt = {};
  $scope.index = [];
  $scope.CView = ["Project", "Sprint"];
  $scope.addT = function(t, p, i)
  {//adds task in project view
    $http.post(URL_ROOT + '/api/v1/tasks',JSON.stringify({name:t, project:p, sprint:"000000000000000000000001", due:$scope.duedate})).
      then(function(res){console.log(res);});
    $http.get(URL_ROOT + '/api/v1/tasks/users').
      then(function(res){$scope.tlist = res.data.task;});
    //reset the value
    $scope.myt[i] = '';
  };
  $scope.addTas = function(t, p, s, si)
  {//adds task to a sprint
    $http.post(URL_ROOT + '/api/v1/tasks',JSON.stringify({name:t, project:p, sprint:s}));
    $http.get(URL_ROOT + '/api/v1/tasks/users').
      then(function(res){console.log(res.data);$scope.tlist = res.data.task;});
    $scope.sptv[si] = "";
  };
  $scope.addP = function()
  {//add project
    $http.post(URL_ROOT + '/api/v1/projects',JSON.stringify({name:$scope.NewProj1})).
      then(function(res){});
    $http.get(URL_ROOT + '/api/v1/projects/users').
      then(function(res){console.log('get complete');$scope.prj = res.data.project;});
    $scope.NewProj1 = "";
  };
  $scope.addS = function(s,p)
  {
    $http.post(URL_ROOT + '/api/v1/sprints',JSON.stringify({name:s, project:p}));
    $http.get(URL_ROOT + '/api/v1/sprints/users').
      then(function(res){$scope.slist = res.data.sprint;});
  };
  $scope.clearlist = function()
  {
    var h = $scope.tlist.filter(function(task)
    { return task.done; });
    $http.put(URL_ROOT + '/api/v1/tasks/done', JSON.stringify(h));
    $http.get(URL_ROOT + '/api/v1/tasks/users').
      then(function(res)
      { $scope.tlist = res.data.task; });
  };
  $scope.notDone = function(a)
  {
    $http.put(URL_ROOT + '/api/v1/tasks/ndone', JSON.stringify(a));
    $http.get(URL_ROOT + '/api/v1/tasks/users').
      then(function(res)
      {$scope.tlist = res.data.task;});
  };
  $scope.going = function(a)
  {
    var r = confirm("Do you want to delete "+a.name+"?");
    if(r){
      var hold = JSON.stringify(a);
      console.log(hold);
      $http(
      {
        method: 'DELETE',
        url: URL_ROOT + '/api/v1/tasks',
        data: JSON.stringify(a),
        headers: {'Content-Type': 'application/json;charset=utf-8'}
      })
      $http.get(URL_ROOT + '/api/v1/tasks/users').
        then(function(res){ $scope.tlist = res.data.task; });
    }
  };
  $scope.deleteSprint = function(v)
  {
    var a = confirm("Delete " + v.name + " with all Tasks");
    if (a)
    {
      var t = $scope.tlist.filter(function(c)
      { return c.sprint == v._id; });//this returns all tasks that have are in this sprint
      $http(
      {//delete the sprint
        method: 'DELETE',
        url: URL_ROOT + '/api/v1/sprints',
        data: JSON.stringify(v),
        headers: {'Content-Type': 'application/json;charset=utf-8'}
      });
      $http.get(URL_ROOT + '/api/v1/sprints/users').
        then(function(res){ $scope.slist = res.data.sprint; });
      t.forEach(function(task)
      {
        $http(
        {//delete the tasks in the sprint
          method: 'DELETE',
          url: URL_ROOT + '/api/v1/tasks',
          data: JSON.stringify(task),
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });
      });
      $http.get(URL_ROOT + '/api/v1/tasks/users').
        then(function(res){ $scope.tlist = res.data.task; });
    }
  };
  $scope.deleteP = function(proj)
  {
    var a = confirm("Delete Project " + proj.name + " and all it Sprints and Tasks?");
    if (a)
    {
      var tl = $scope.tlist.filter(function(task)
      {//remove all tasks for the project
        return task.project != name;
      });
      var sl = $scope.slist.filter(function(sprint)
      {//remove all sprints for the project
        return sprint.project != name;
      });
      tl.forEach(function(task)
      {
        $http(
        {//delete the tasks in the sprint
          method: 'DELETE',
          url: URL_ROOT + '/api/v1/tasks',
          data: JSON.stringify(task),
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });
      });
      $http.get(URL_ROOT + '/api/v1/tasks/users').
        then(function(res){ $scope.tlist = res.data.task; });
        sl.forEach(function(sprint)
        {
          $http(
          {//delete the tasks in the sprint
            method: 'DELETE',
            url: URL_ROOT + '/api/v1/sprints',
            data: JSON.stringify(sprint),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
          });
        });
        $http.get(URL_ROOT + '/api/v1/sprint/users').
          then(function(res){ $scope.slist = res.data.sprint; });
        $http(
        {//delete the tasks in the sprint
          method: 'DELETE',
          url: URL_ROOT + '/api/v1/projects',
          data: JSON.stringify(proj),
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        });
        $http.get(URL_ROOT + '/api/v1/projects/users').
          then(function(res){
            $scope.prj = res.data.project;
          });
    }
  };
  $scope.changeSpt = function(v, s)
  {
    v.sprint = $scope.index[s];
    $http.put(URL_ROOT + '/api/v1/tasks/sprint', JSON.stringify(v)).
      then(function(res){console.log(res);});
    $http.get(URL_ROOT + '/api/v1/tasks/users').
      then(function(res){ $scope.tlist = res.data.task; });
  }
  $scope.addTNS = function(tName, p)
  {
    $http.post(URL_ROOT + '/api/v1/tasks',JSON.stringify({name:tName, project:p._id, sprint:"000000000000000000000001"})).
      then(function(res){console.log(res);});
    $http.get(URL_ROOT + '/api/v1/tasks/users').
      then(function(res){
        $scope.tlist = res.data.task;
      });
  }
});
