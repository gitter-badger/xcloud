/**
 * Allows you to bind an event to an object such that it's called before all other bound events
 * @see http://stackoverflow.com/questions/2360655/jquery-event-handlers-always-execute-in-order-they-were-bound-any-way-around-t
 */
(function($){
	
	//don't redefine if something else defined it
	if( typeof $.fn.bindFirst === 'function' ) return;
	
	// [name] is the name of the event "click", "mouseover", .. 
	// same as you'd pass it to bind()
	// [fn] is the handler function
	$.fn.bindFirst = function(name, fn) {
		// bind as you normally would
		// don't want to miss out on any jQuery magic
		this.on(name, fn);
	
		// Thanks to a comment by @Martin, adding support for
		// namespaced events too.
		this.each(function() {
			var handlers = $._data(this, 'events')[name.split('.')[0]];
			// take out the handler we just inserted from the end
			var handler = handlers.pop();
			// move it at the beginning
			handlers.splice(0, 0, handler);
		});
	};
	
})(jQuery);

