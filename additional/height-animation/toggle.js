
	(function(document, window, undefined) {

		'use strict';

		if (!document.addEventListener || !('classList' in document.createElement('span'))) { // classList = IE11
			return;
		}

		function widget_toggle(e) {

			var widget_ref = document.getElementById(this.getAttribute('aria-controls'));

			if (widget_ref.getAttribute('aria-hidden') == 'true') {

				this.setAttribute('aria-expanded', 'true');
				this.textContent = this.getAttribute('data-toggle-hidden');

				widget_ref.setAttribute('aria-hidden', 'false');
				widget_ref.focus();

			} else {

				this.setAttribute('aria-expanded', 'false');
				this.textContent = this.getAttribute('data-toggle-shown');

				widget_ref.setAttribute('aria-hidden', 'true');

			}

			e.preventDefault();

		}

		function init() {

			var links = document.querySelectorAll('a[data-toggle-hidden]'),
				widget_ref_id,
				widget_ref;

			for (var k = (links.length - 1); k >= 0; k--) {

				widget_ref_id = links[k].getAttribute('href').substr(1);
				widget_ref = document.getElementById(widget_ref_id);

				if (widget_ref) {

					widget_ref.setAttribute('aria-hidden', 'true');
					widget_ref.setAttribute('tabindex', '-1');
					widget_ref.style.outline = 'none';

					links[k].setAttribute('data-toggle-shown', links[k].textContent);
					links[k].setAttribute('role', 'button');
					links[k].setAttribute('aria-expanded', 'false');
					links[k].setAttribute('aria-controls', widget_ref_id);
					links[k].addEventListener('click', widget_toggle);

				}

			}

		}

		if (document.readyState !== 'loading') {
console.log('a');
			window.setTimeout(init); // Handle asynchronously
		} else {
console.log('b');
			document.addEventListener('DOMContentLoaded', init);
		}

	})(document, window);
