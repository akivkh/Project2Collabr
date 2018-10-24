myApp.service('ChatService',function($q,$timeout)
{
  var base_url="";
  var service={},listener=$q.defer(),socket={client:null,stomp:null},messageIds=[];
	
  	service.RECONNECT_TIMEOUT=3000;
  	service.SOCKET_URL=base_url+"/chat";
  	service.CHAT_TOPIC="/topic/message";
  	service.CHAT_BROKER="/app/chat";
  	
  	service.send=function(message)
  	{
  		var id=Math.floor(Math.random()*1000000);
  		socket.stomp.send(service.CHAT_BROKER,{priority:9},JSON.stringify({message:message,id:id}));
  		messageIds.push(id);
  	};
  	service.receive=function()
  	{
  		return listener.promise;
  	};
  	var reconnect=function()
  	{
  		$timeout(function()
  				{
  			initialize();
  				},
  				this.RECONNECT_TIMEOUT);
  	};
  	
  	var getMessage=function(date)
  	{
  		var message=JSON.parse(data),out={};
  		out.message=message.message;
  		out.time= new Date(message.time);
  		return out;
  	};
  	var startListener=function()
  	{
  		soscket.stomp.subscribe(service.CHAT_TOPIC,function(data)
  		{
  			listener.notify(getMessage(data.body));
  		});		
  		
  	};
  	
  	var intialize=function()
  	{
  		socket.client=new SockJs(service.SOCKET_URL);
  		socket.stomp=Stomp.over(socket.client);
  		socket.stomp.connect({},startListener);
  		socket.stomp.onclose=recconect;
  	};
  	
  	initialize();
  	return service;
});		


