Rdio Offline Agent
====

A collection of scripts for use with the Rdio service.

```javascript
(function() {
    var d = document,
        s = d.createElement('script'),
        t = d.body;
    s.src = "https://raw.github.com/isg/rdio/master/offline.js";
    t.appendChild(s);
})();
```

Can be minified and stored as a bookmark like so:

```javascript
javascript:(function(){var d=document,s=d.createElement('script'),t=d.body;s.src="https://raw.github.com/isg/rdio/master/offline.js";t.appendChild(s);})();
```
