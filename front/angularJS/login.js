app.controller('loginCtrl', function($scope)
{
    $scope.createNAcc = false;
    $scope.Login = function(encrpw)
    {
      if($scope.logme.uname.$valid && $scope.pword.length)
      {
        $http.post('http://localhost:3000/api/v1/login', JSON.stringify({name:$scope.uname, password:encrpw})).
          then(function(res)
          {//routing
            if(res.user){self.location = "http://localhost:3000/#/";}
            else{alert("Invalid Username and Password.");}
          });
      }
      else{alert('Please enter a valid email and password');}
    };
    $scope.Register = function()
    {
      if($scope.register.nEmail.$valid && $scope.nPword == $scope.reEnter)
      {
        $http.post('http://localhost:3000/api/v1/users',JSON.stringify({name:$scope.nEmail, password:$scope.nPword}));
      }
      else
      {alert('Please enter a valid email and ensure the passwords match.');}
    };
});
