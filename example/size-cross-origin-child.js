
;(function(document, window, undefined) {

	'use strict';

	if (!document.addEventListener) {
		return;
	}

	function init() {

		var owner = null,
			width = Math.max(document.body.scrollWidth,  document.body.offsetWidth,  document.documentElement.clientWidth,  document.documentElement.scrollWidth,  document.documentElement.offsetWidth),
			height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight),
			iframe = RegExp('[?&]iframe=([a-z\-]+)').exec('?iframe=iframe'); // window.location.search

		if (iframe) {

			try {
				owner = parent.document; // Same domain access?
			} catch (e) {
			}

			if (owner) {
				var iframe = owner.getElementById(decodeURIComponent(iframe[1]));
				if (iframe) {
					iframe.style.height = height + 'px';
					return;
				}
			}

		}

		if (parent.postMessage) {
			owner = parent;
		} else if (parent.contentWindow && parent.contentWindow.postMessage) {
			owner = parent.contentWindow;
		} else {
			owner = null;
		}

		if (owner) {
			owner.postMessage({'request' : 'iframeReize', 'width' : width, 'height' : height}, '*');
		}

	}

	document.addEventListener('DOMContentLoaded', init);

})(document, window);
