myApp.controller("UserController",function($scope,$http,$location,$rootScope,$cookieStore){
    
	$scope.user={"name":'',"password":'',"email":'',"address":'',"phone":'',"role":'',"isOnline":''};
	
	   $scope.register=function(){
		   alert("Registration function");
		   $http.post('http://localhost:8080/collabMiddleware/registerUser',$scope.user)
		   .then(function(response){
			   console.log('Status text:' +response.statusText);
			   alert('Register successfully...!!');
		 });
 };
     $rootScope.login=function(){
    	 alert("Logging Function");
    	 $http.post("http://localhost:8080/collabMiddleware/login",$scope.user)
    	 .then(function(response){
    	       console.log(response.status);
    	       $scope.user=response.data;
    	       $rootScope.currentUser=response.data;
    	       $cookieStore.put('userDetails',response.data);
    	       console.log($rootScope.currentUser.role);
    	       if($rootScope.currentUser.role=='Admin'){
    	    	   console.log("Admin");
    	       }
    	       if($rootScope.currentUser.role=='User'){
    	    	   console.log("User");
    	       }
    		 $location.path("/");
    	 });
     };
     
     $rootScope.displayDetails=function()
     {
    	 console.log("Display Details function called:");
     }
    	
       $scope.update=function(email){
    	   
    	   console.log("Enter into the update User method '+email");
    	   $http("http://localhost:8080/collabMiddleware/update/" +email,$scope.currentUser)
    	     .then (function(response){
    		   console.log('Status text:' +response.statusText);
    		   alert('details updated successfully..!!');
    		   $location.path("/viewProfile");
    	   });
       }
     
     $rootScope.logout=function(){
    	 console.log('Logout function');
    	 delete $rootScope.currentUser;
    	 $cookiesStore.remove('userDetails');
    	 $location.path("/");
     }
 
});