$(document).ready(function(){
	$('.category-delete').click(function(e){
		$target = $(e.target);		
		var  categoryId = $target.attr('data-category-id');
		var  csrf = $target.attr('data-csrf');
		
		$.ajax({
			type: 'DELETE',
			url: '/api/categories/delete/' + $target.attr('data-category-id'),
			data: {
				_csrf: csrf
			},
			success: function(data, textStatus, xhr){
				
				if(xhr.status === 204){					
					alert("Category Deleted!")
				}else{
					alert( "textStatus:" + textStatus
						+ "\n\nXMLHttpRequest" 
						+ "\n readyState  : " + xhr.readyState
						+ "\n responseText: " + xhr.responseText
						+ "\n status      : " + xhr.status
						+ "\n statusText  : " + xhr.statusText
						+ "\n CategoryId  : " + categoryId 
						+ "\n _CSRF       : " + csrf
					);
				}
				
				window.location.href='/categories'
			},
			error: function(xhr, error, textStatus){
				alert("LOOK AT CONSOLE FOR MORE INFORMATION!"
					+ "\n\n status      : " + xhr.status
					+ "\n statusText      : " + xhr.statusText
				);
				console.log(xhr);
				console.log(error);
				console.log(textStatus);
			}
		});
	});	
	
	
	$('.article-delete').click(function(e){
		$target = $(e.target);		
		var  articleId = $target.attr('data-article-id');
		var  csrf = $target.attr('data-csrf');
		
		$.ajax({
			type: 'DELETE',
			url: '/api/articles/delete/' + $target.attr('data-article-id'),
			data: {
				_csrf: csrf
			},
			success: function(data, textStatus, xhr){
				
				if(xhr.status === 204){					
					alert("Article Deleted!")
				}else{
					alert( "textStatus:" + textStatus
						+ "\n\nXMLHttpRequest" 
						+ "\n readyState  : " + xhr.readyState
						+ "\n responseText: " + xhr.responseText
						+ "\n status      : " + xhr.status
						+ "\n statusText  : " + xhr.statusText
						+ "\n articleId  : " + articleId 
						+ "\n _CSRF       : " + csrf
					);
				}
				
				window.location.href='/articles'
			},
			error: function(xhr, error, textStatus){
				alert("LOOK AT CONSOLE FOR MORE INFORMATION!"
					+ "\n\n status      : " + xhr.status
					+ "\n statusText      : " + xhr.statusText
				);
				console.log(xhr);
				console.log(error);
				console.log(textStatus);
			}
		});
	});	
	
	/////////////////////////////////////////////////////////////////////////////////////////////
	// SOCKET
	
	var socket = io.connect('http://localhost:3000');
	var message = $('#chatInput');
	var chatWindow = $('#chatWindow');
	var username = $('#username');
	var users = $('#users');
	var error = $('#error');
	
	// Submit User Form
	$('#userFormButton').click(function(e){
		console.log("userFormButton.submit");
		e.preventDefault();
		socket.emit('set user', username.val(), function(data){
			if(data){
				error.hide();
				console.log("call back from set user");
				$('#mainWrap').css('display','block');
				$('#userFormWrap').hide();
			} else {
				error.html('Username is already taken');
			}
		});
	});
	


	$('#chatFormButton').click(function(e){
		e.preventDefault();
		socket.emit('send message', message.val());
		message.val('');
	});

	socket.on('show message', function(data){
		chatWindow.append('<strong>'+data.user+'</strong>: '+data.msg+'<br>');
	});

	// Display Usernames
	socket.on('users', function(data){
		var html = '';
		for(var i = 0; i < data.length; i++){
			html += '<li class="list-group-item">'+data[i]+'</li>';
		}
		users.html(html);
	});
});