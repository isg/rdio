## Rdio Offline Agent ##

### Overview ###
<a href="http://www.rdio.com">Rdio</a> is an awesome music service. Within a few hours of using the service,
my library grew to well over 1,000 songs. When I attempted to take advantage of Rdio's mobile syncing service --
so that all of my music would be available on my phone offline -- I was disappointed to discover that I had to
<b>manually</b> mark each song! I wanted to mark my entire collection as available offline, which would have
taken hours to do so manually (especially if my library keeps growing). This script takes care of that.

### Usage ###
Simply create a bookmark with the following URL.

```javascript
javascript:(function(){var d=document,s=d.createElement('script'),t=d.body;s.src='https://raw.github.com/isg/rdio/master/offline.js';t.appendChild(s);})();
```

You can name it whatever you want, but <i>Rdio Offline Agent</i> probably works! This is what is known as a 
<a href="https://en.wikipedia.org/wiki/Bookmarklet">bookmarklet</a>. Clicking the bookmark loads an external 
JavaScript file which executes the script on Rdio's page.

Navigate to http://www.rdio.com/people/<i>username</i>/collection/songs/. Once the page has loaded, click the
bookmarklet, sit back and relax, and watch as all of your songs are marked as available offline!
