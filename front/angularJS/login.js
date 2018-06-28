app.controller('loginCtrl', function($scope, $http)
{
    $scope.createNAcc = false;
    $scope.Login = function()
    {
      console.log('test');
      if($scope.logme.uname.$valid && $scope.pword.length)
      {
        $http.post('http://localhost:3000/api/v1/login', JSON.stringify({email:$scope.uname, password:$scope.pword})).
          then(function(res)
          {//routing
            if(res.status === 200){self.location = "http://localhost:3000/#/task";}
            else{alert("Invalid Username and Password.");}
          });
      }
      else{alert('Please enter a valid email and password');}
    };
    $scope.Register = function()
    {
      console.log('test');
      if($scope.register.nEmail.$valid && $scope.nPword == $scope.reEnter)
      {
        $http.post('http://localhost:3000/api/v1/users',JSON.stringify({name:$scope.nEmail, password:$scope.nPword}));
      }
      else
      {alert('Please enter a valid email and ensure the passwords match.');}
    };
});
