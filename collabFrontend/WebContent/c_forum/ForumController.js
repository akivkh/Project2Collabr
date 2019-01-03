myApp.controller("ForumController", function($scope, $http, $location,$rootScope, $window) {
	$scope.forum = {"forumId":0,"forumName" : '',"forumContent" : '',"createdDate" : '',"userName" : '',"status" : ''}
	$rootScope.forum = {"forumId":0,"forumName" : '',"forumContent" : '',"createdDate" : '',"userName" : '',"status" : ''}
	$scope.forumData;

	$scope.insertForum = function() {
		console.log('Entered into the insertForum method');
		$scope.forum.userName=$rootScope.currentUser.name;
		$http.post("http://localhost:8080/collabMiddleware/addForum",$scope.forum)
				.then(fetchAllForums(), function(response) {
						$scope.forumData=response.Data;
						console.log('Status text:' + response.statusText);
						 $window.alert("Data inserted successfully");
				});
	};
	function fetchAllForums() {
		
		$http.get("http://localhost:8080/collabMiddleware/listForums").then(
				function(response) {
					
					alert('list of blogs');
					/*console.log('Status text:' + response.statusText);*/
					$scope.forumData = response.data;
					/*console.log(response.data);*/
				});
	};
	$scope.editForum = function(forumId) {
		alert('In editForum method');
		$http.get('http://localhost:8080/collabMiddleware/getForum/' + forumId)
				.then( function(response) {
					console.log('In edit forum');
					console.log(response.data);
					$scope.forum = response.data;
					console.log('Status Text' + response.statusText);
					$location.path('/updateForum');
				});
	};

	$scope.updateForum = function(forumId){
		alert('Entered into the updateForum method');
		console.log(forumId);
		$http.put('http://localhost:8080/collabMiddleware/updateForum/'+ forumId, $scope.forum)
		.then(fetchAllForums(), function(response){
			console.log('updated forum'+ forumId+ ' successfully');
			console.log(forumId +" updated successfully");
			 $location.path('/updateForum');
			$window.alert('Forum updated successfully...');
			
		});
		
	};
	$scope.deleteForum = function(forumId){
		alert('Entered into the deleteForum method');
		$http.delete('http://localhost:8080/collabMiddleware/deleteForum/'+forumId)
		.then(fetchAllForums(), function(response){
			console.log('Forum deleted '+ forumId);
			console.log('Response Status ' + response.statusText);
			fetchAllForums();
			$window.alert('Forum deleted successfully..');
		});
	};

	fetchAllForums();
});