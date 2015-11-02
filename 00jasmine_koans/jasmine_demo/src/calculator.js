window.Calculator = {
	current:0 ,
	
	add: function(){
		var sum = 0;
		for(var i =0, len = arguments.length;i < len;i++){
			sum += arguments[i];	
		}
		this.current += sum;
		return this.current;
	},
	
	subtract: function(){
		var sum = 0;
		for(var i =0, len = arguments.length;i < len;i++){
			sum += arguments[i];	
		}
		this.current -= sum;
		return this.current;
	},
	
	reset: function(){
		this.current = 0;
	}
	
};

