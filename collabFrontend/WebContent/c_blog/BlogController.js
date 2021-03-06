myApp.controller("BlogController",function($scope,$http,$location)
		{
			$scope.blog = {"blogName":'',"blogContent":'',"createDate":'',"userName":'',"status":'',"likes":0};
			$scope.blogData;
			$scope.insertBlog = function(){
				
				alert('inside insert Blog');
				$http.post('http://localhost:8080/collabMiddleware/addBlog',$scope.blog)
				.then(fetchAllBlog(), function(response) {
					//$location.reload();
					alert('Status text:' + response.statusText);
				});
			};
			
			function fetchAllBlog()
			{
				alert('Fetch All Blogs');
				$http.get("http://localhost:8080/collabMiddleware/listBlog")
				.then(function(response)
				{
					$scope.blogData=response.data;
				})
			}
			$scope.editBlog = function(blogId) {
				$http.get('http://localhost:8080/collabMiddleware/getBlog/' + blogId)
						.then(function(response) {
							console.log(response.status);
							$scope.blog = response.data;
							$location.path('/updateBlog');
							console.log('Status Text' + response.statusText);
							
						});
			};

			$scope.updateBlog = function(blogId){
				/*alert("in update blog");*/
				$http.put('http://localhost:8080/collabMiddleware/updateBlog/'+ blogId, $scope.blog)
				.then(fetchAllBlogs(), function(response){
					console.log('updated blog'+ blogId+ ' successfully');
					 $location.path('/updateBlog');
					$window.alert(blogId +" updated successfully");
				// $location.reload();
				});
				
			};
			$scope.deleteBlog = function(blogId){
				// alert("in delete blog");
				$http.delete('http://localhost:8080/collabMiddleware/deleteBlog/'+blogId)
				.then(fetchAllBlogs(), function(response){
					console.log('Blog deleted '+ blogId);
					console.log('Response Status ' + response.statusText);
				// $location.reload();
				});
			};
			$scope.incrementLike = function(blogId) {
				alert('Into like increment');
				$http.post(
						'http://localhost:8080/collabMiddleware/incrementLikes/'
								+ blogId, $scope.blog).then(fetchAllBlogs(),
						function(response) {
							console.log('Incremented likes');
							$location.path('/Blog')
						});
		}
			fetchAllBlog();
		});