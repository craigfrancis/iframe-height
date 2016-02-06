
;(function(document, window, undefined) {

	'use strict';

	if (!document.addEventListener) {
		return;
	}

	function init() {
		var height = Math.max(iframe.contentWindow.document.body.scrollHeight, iframe.contentWindow.document.body.offsetHeight, iframe.contentWindow.document.documentElement.clientHeight, iframe.contentWindow.document.documentElement.scrollHeight, iframe.contentWindow.document.documentElement.offsetHeight);
		iframe.style.height = height + 'px';
	}

	var iframe = document.getElementById('iframe');
	if (iframe) {
		iframe.addEventListener('load', init);
	}

})(document, window);
