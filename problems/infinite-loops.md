
# Infinite loops

As raised by [Jake Archibald](https://lists.w3.org/Archives/Public/www-style/2016Feb/0065.html), this could "suffer from the same infinite loop issue as element queries".

It is possible that the framed content includes a media query that is based on **height**, and this is a problem, as unlike a normal viewport, this **height** is now dependent on the content.

But we can cheat here, as we don't need to consider every edge case that the element queries proposal needed to consider.

So if the browser was to do an initial layout, and it determines a second pass is necessary, let it do that.

But if this causes the document to...

1. Alternate between two heights, "*then fix the `iframe` viewport at the larger size*". This will cause the `iframe` to be a bit too big, but it won't really cause any problems.

2. Keep shrinking, "*then fix the `iframe` viewport at the larger size*", and again, allow it to be too big.

3. Keep growing, "*then fix the `iframe` viewport at the larger size*" (second pass), and now disable the auto-resize, so it basically falls back to the old behaviour of using a scroll bar (and if the browser is feeling charitable, it could add a note in the dev console, explaining why this happened).

That said, In every case I've looked at, this shouldn't be a problem, as the `iframe` only needed to change the **height**, whereas most media queries are based on the **width**.

This is because the **width** is being enforced by the viewport on to the content (as we hate horizontal scroll bars), where this restriction goes down the nodes... whereas the **height** is determined by the content, and is passed up the nodes to the viewport (resulting in the vertical scroll bar).

This is why I'm only proposing that the `iframe` supports re-sizing on the **height**, where the parent document sets the **width**.

And it's not like the current JavaScript solutions/hacks don't have the same problems.
