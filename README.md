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

Open your Rdio collection in Chrome and make sure you're listing all songs (the URL should be of the form 
<i>/people/<i>username</i>/collection/songs/</i>). When the page has loaded, click the
bookmarklet, sit back and relax, and watch as all of your songs are marked as available offline! 

To throttle the requests my script makes to Rdio, you should expect this to process to take awhile.
1,000 songs might take 3-5 minutes. Of course, this is only slow the first time. If you do it frequently,
each time only takes as long as the number of songs you've added to your collection since your last run.

### How It Works ###

This is what is known as a <a href="https://en.wikipedia.org/wiki/Bookmarklet">bookmarklet</a>. Clicking the
bookmark loads an external JavaScript file which executes the script on Rdio's page. 

The script itself starts by scrolling the page to its entirety in order to load all of your songs in the DOM 
at once. After doing so, the necessary clicks are simulated in order to make each song as available offline.

### FAQ ###

* <b>Couldn't you use the Rdio API instead of this gross hack?</b> 
That would require every person who wanted to use this tool to first create a developer account. Doing it this
way doesn't require any work for you!

* <b>Won't this totally break if Rdio changes their website layout?</b> Yup.

* <b>Could this erase my library?</b> I don't think so. But, in the interest of full disclosure: I accidentally 
erased my library when working on this tool. 
