
;(function(document, window, undefined) {

	'use strict';

	if (!document.addEventListener) {
		return;
	}

	function receiveMessage(event) {

		var origin = event.origin || event.originalEvent.origin;
		if (origin !== 'http://www.example.com') {
			return;
		}

		if (event.data.request && event.data.request == 'iframeReize') {
			var iframe = document.getElementById('iframe');
			if (iframe) {
				iframe.style.height = event.data.height + 'px';
			}
		}

	}

	window.addEventListener('message', receiveMessage, false);

})(document, window);
