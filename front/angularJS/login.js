app.controller('loginCtrl', function($scope, $http, sVars)
{
    $scope.createNAcc = false;
    let URL_ROOT = sVars.getURL();
    $scope.Login = function()
    {

      if($scope.logme.uname.$valid && $scope.pword.length)
      {

        $http.post(URL_ROOT +'/api/v1/login', JSON.stringify({email:$scope.uname, password:$scope.pword})).
          then(function(res)
          {//routing
            if(res.status === 200){self.location = URL_ROOT +'/#/task';}
            else{alert("Invalid Username and Password.");}
          });
      }
      else{alert('Please enter a valid email and password');}
    };
    $scope.Register = function()
    {
      if($scope.register.nEmail.$valid && $scope.nPword == $scope.reEnter)
      {
        $http.post(URL_ROOT +'/api/v1/users', JSON.stringify({name:$scope.nEmail, password:$scope.nPword}));
      }
      else
      {alert('Please enter a valid email and ensure the passwords match.');}
    };
});
