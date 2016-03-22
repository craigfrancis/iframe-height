
;(function(document, window, undefined) {

	'use strict';

	if (!document.addEventListener) {
		return;
	}

	var iframe;

	function init_iframe() {
		var height = Math.max(iframe.contentWindow.document.body.scrollHeight, iframe.contentWindow.document.body.offsetHeight, iframe.contentWindow.document.documentElement.clientHeight, iframe.contentWindow.document.documentElement.scrollHeight, iframe.contentWindow.document.documentElement.offsetHeight);
		iframe.style.height = height + 'px';
	}

	function init() {
		iframe = document.getElementById('iframe');
		if (iframe) {

			iframe.addEventListener('load', init_iframe);

			try {
				if (iframe.contentWindow.document.readyState !== 'loading') {
					window.setTimeout(init_iframe);
				}
			} catch (e) {
			}

		}
	}

	if (document.readyState !== 'loading') {
		window.setTimeout(init); // Handle asynchronously
	} else {
		document.addEventListener('DOMContentLoaded', init);
	}

})(document, window);
