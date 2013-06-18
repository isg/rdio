## Rdio Agent ##

### Overview ###
This script adds desirable (and unfortunately lacking) functionality to the Rdio web app including the following:
* Mark your entire collection as available offline (sync) in a single click
* Unmark your entire collection from offline availability in a single click
* Add the song to which you're currently listening to your collection in a single click

I created this script after spending several hours individually marking every album in my library for offline
availability. There is now a better way!

### Usage ###
Simply create a bookmark with the following URL:

```javascript
javascript:(function(){var d=document,s=d.createElement('script'),t=d.body;s.src='https://raw.github.com/isg/rdio/master/agent.js';t.appendChild(s);})();
```

Visit Rdio in a web browser (tested in Chrome) and click the bookmarklet. You will see new options magically appear
in the navigation bar, giving you the extra tools you need. In a single click, easily sync every song
in your collection.

### How It Works ###

This is what is known as a <a href="https://en.wikipedia.org/wiki/Bookmarklet">bookmarklet</a>. Clicking the
bookmark loads an external JavaScript file which executes within Rdio's web app. The script itself 
simply makes requests to Rdio's API on your account's behalf.

### FAQ ###

* <b>Couldn't you make a real site to do this using the Rdio API instead of a bookmarklet?</b> 
That would require every person who wanted to use the tool to first create a developer account. Doing it this
way saves a lot of effort on the part of the user.

* <b>Will this break if Rdio changes their website layout?</b> Possibly, although it will be easy to fix.

* <b>Could this inadvertently erase my library?</b> No.
