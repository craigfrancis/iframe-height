
# IFrame Height

After the recent removal of the `@seamless` attribute on `<iframes>` from the WHATWG spec ([issue 331](https://github.com/whatwg/html/issues/331)).

We still need to consider the problem of setting the height of iframes, so they contain their content (without scroll bars).

This proposal is to use 1 line of CSS:

	<iframe src="./framed.html" id="iframe"></iframe>
	<style>
		#iframe { height: max-content; }
	</style>

And 1 header, to be set on the framed content (framed.html):

	Expose-Height-Cross-Origin: 1;

This header is for security reasons, otherwise it can leak state information (e.g. the height of the page may determine if a user is logged in).

I believe this is the main feature that `@seamless` needed to provide, rather than the `<iframe>` content being "rendered in a manner that makes it appear to be part of the containing document" ([spec](https://www.w3.org/html/wg/drafts/html/master/single-page.html#attr-iframe-seamless)).

Further discussion on this proposal is on:

- [WHATWG Issue Log](https://github.com/whatwg/html/issues/555)
- [W3C WWW-Style](https://lists.w3.org/Archives/Public/www-style/2016Jan/0236.html)

---

## Current solutions

### Same Domain

It is possible to set the height with JavaScript:

	var iframe = document.getElementById('iframe'),
		height = iframe.contentWindow.document.body.scrollHeight;

	iframe.style.height = height + 'px';

But this needs to be done whenever the content changes, such as navigating to a new page, or when new content is exposed (e.g. JS disclosure widget).

Typically this is solved with a setTimeout(), which is not ideal.

### Cross Domain

Due to the security restrictions in place, this requires the iframed content to use postMessage() every time the size changes.

This is currently custom code on every website, as no-one can agree on what format the postMessage() should use.

An example can be seen in these [child](/example/size-cross-origin-child.js) and [parent](/example/size-cross-origin-parent.js) JavaScript files.

### Others

Have a search though stack overflow:

http://stackoverflow.com/search?q=resize+iframe

---

## Feature Requests

- [Chrome](https://crbug.com/XXX)
- [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=XXX)
- [Edge](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/XXX)
