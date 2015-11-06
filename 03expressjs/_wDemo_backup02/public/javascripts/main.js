$(document).ready(function(){
	$('.category-delete').click(function(e){
		$target = $(e.target);		
		var  categoryId = $target.attr('data-category-id');
		var  csrf = $target.attr('data-csrf');
		
		$.ajax({
			type: 'DELETE',
			url: '/categories/delete/' + $target.attr('data-category-id'),
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
			error: function(error){
				alert(error);
				console.log(error);
			}
		});
	});
});