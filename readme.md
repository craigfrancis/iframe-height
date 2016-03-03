
# iFrame Height

After the recent removal of the `@seamless` attribute on the `<iframe>` from the WHATWG spec ([issue 331](https://github.com/whatwg/html/issues/331)); we still need to consider the problem of setting the height of iframes, so they contain their content without scroll bars.

This proposal is to use 1 line of CSS:

	<iframe src="./framed.html" id="iframe"></iframe>
	<style>
		#iframe { height: max-content; }
	</style>

And 1 header, to be set on the framed content (framed.html):

	Expose-Height-Cross-Origin: 1;

This header is for security reasons, otherwise it can leak state information (e.g. the height of the page may determine if a user is logged in).

This was the main feature that `@seamless` needed to provide, rather than the `<iframe>` content being "rendered in a manner that makes it appear to be part of the containing document" ([spec](https://www.w3.org/html/wg/drafts/html/master/single-page.html#attr-iframe-seamless)).

Further discussion on this proposal is on:

- [WHATWG Issue Log](https://github.com/whatwg/html/issues/555)
- [W3C WWW-Style](https://lists.w3.org/Archives/Public/www-style/2016Jan/0236.html)

And the browser feature requests:

- [Chrome](https://crbug.com/584913)
- [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1246423)
- [Edge](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/12237801-feature-request-auto-resize-iframes-based-on-cont)
- [Opera](https://forums.opera.com/discussion/1870727/feature-request-auto-resize-iframes-based-on-content#Item_1)
- [Safari](https://bugs.webkit.org/show_bug.cgi?id=153952)

---

## Additional uses

This could be set on a `<textarea>`, so its height automatically increases:

	textarea {
	    height: max-content;
	}

- http://alistapart.com/article/expanding-text-areas-made-elegant
- http://www.impressivewebs.com/textarea-auto-resize/
- http://stephanwagner.me/auto-resizing-textarea
- http://github.com/thomasjo/jquery-autoresize
- https://github.com/javierjulio/textarea-autosize
- https://github.com/basic-web-components/basic-web-components/tree/master/packages/basic-autosize-textarea

And as alternative to "max-height: 100000px" when animating the opening/closing of simple disclosure widgets:

	#widget {
	    overflow-y: hidden;
	    height: max-content;
	    transition-property: all;
	    transition-duration: .5s;
	}

	#widget.closed {
	    height: 0;
	}

- https://davidwalsh.name/css-slide
- https://jsfiddle.net/ProLoser/nurx8/
- http://weblog.west-wind.com/posts/2014/Feb/22/Using-CSS-Transitions-to-SlideUp-and-SlideDown
- http://stackoverflow.com/questions/17301282/transitioning-between-open-close-in-details-element/17301828

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

Due to the security restrictions in place, this requires the document in the `<iframe>` to use postMessage() every time the content changes.

This is currently custom code on every website, as no-one can agree on what format the postMessage() should use.

An example can be seen in these [child](/example/size-cross-origin-child.js) and [parent](/example/size-cross-origin-parent.js) JavaScript files.

---

## Potential problems

- Infinite loops with media queries, raised by [Jake Archibald](https://lists.w3.org/Archives/Public/www-style/2016Feb/0065.html) ([more details](./problems/infinite-loops.md)).

---

### Requests from other developers

- [Queries on Stack Overflow](http://stackoverflow.com/search?q=resize+iframe) - a common problem.
- [Mozilla bug report from 2001](https://bugzilla.mozilla.org/show_bug.cgi?id=80713) - in relation to seamless.
- [Feature request from 2005](http://blog.gerv.net/2005/02/autosizing_ifra/) - with discussion of problems.
- [Example JavaScript solution from 2010](https://css-tricks.com/snippets/jquery/fit-iframe-to-content/) - check the comments.

