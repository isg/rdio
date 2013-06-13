// Isaac Goldberg
// http://www.goldberg.io
// Rdio Offline Agent

(function() {
    // Default behavior is to mark all unsyncing songs as syncing
    var clickSelectorAllRows = ".ActionMenu.pill.dark.in_collection:not(.synced)";
    var clickSelectorSyncButton = "li:contains(Sync to Mobile):eq(0)";

    /*
     * WARNING. Uncommenting the following two lines will UNSYNC all songs.
     */
    clickSelectorSyncButton = "span.delete:eq(1)"
    clickSelectorAllRows =  ".ActionMenu.pill.dark.in_collection.synced";

    /*
     * DOUBLE WARNING. Uncommenting the following lines will DELETE all songs
     */
    // clickSelectorSyncButton = "span.delete:eq(0)"
    // clickSelectorAllRows =  ".ActionMenu.pill.dark.in_collection";

    var numberNotSynced = -1; // For use later
    var markingInterval = null; // For use later
    // Setup popup display
    var messageBoxWidth = 350;
    var messageBoxHeight = 150;
    var messageBoxCSS = {
        'position': 'absolute',
        'height': messageBoxHeight,
        'width': messageBoxWidth,
        'left': $(document).width()/2 - messageBoxWidth/2,
        'top': $(document).height()/2 - messageBoxHeight/2 - 30,
        'z-index': 1,
        'background-color': 'rgba(0, 143, 213, 0.8)',
        '-webkit-border-radius': 15,
        '-moz-border-radius': 15,
        'border-radius': 15,
        '-webkit-box-shadow': '#B3B3B3 6px 6px 6px',
        '-moz-box-shadow': '#B3B3B3 6px 6px 6px',
        'box-shadow': '#B3B3B3 6px 6px 6px',
        'color': 'white',
        'text-align': 'center',
        'font-size': '140%',
        'padding-top': 25,

    };
    $("body").prepend('<div id="messageBox"><h1>Rdio Offline Agent</h1><br/><span id="messageBoxStatus"><i>Initializing...</span></div>');
    $("#messageBox").css(messageBoxCSS);

    // Utility function to destroy the popup when we're ready
    var closePopup = function() {
        $("#messageBox").remove();
    }

    // Ensure we're on a compatible page
    var regex = /.*rdio.com\/people\/.*\/collection\/.*songs\/$/;
    if ($(location).attr('href').match(regex) === null) {
        $("#messageBoxStatus").html("Your view must list songs (not albums).<br>Navigate to /collection/songs/ and retry.<br>Closing in five seconds...");
        setTimeout(closePopup, 5000);
        return;
    }

    var box = $(".scroller.vertical:eq(1)");
    var oldScrollTop = 0;
    var loadAllRows = function() {
        // Scroll infinite scrolling window
        oldScrollTop = box.scrollTop();
        box.scrollTop(box.scrollTop() + box.height());
    }
    var collisions = 0;
    var checkLoading = function() {
        numberNotSynced = $(clickSelectorAllRows).length; // Initialize

        // Check if spinner is not loading and is visible.
        // Occasionally we might happen to check right after a load finishes
        // but before the spinner is sent farther down the page when the DOM
        // updates. Therefore, we require the condition to be true consistently.
        var spinner = $(".Spinner:eq(1)");
        // if (spinner.hasClass("loaded") && spinner.offset().top < box.height()) {
        if (oldScrollTop == box.scrollTop()) {
            if (++collisions == 10) {
                clearInterval(loadingInterval);
                clearInterval(checkingInterval);
                box.scrollTop(0);

                $("#messageBoxStatus").html('Marking items... <span id="marking-percentage">0</span>%<br>This may take some time.');
                markingInterval = setInterval(markItems, 1000);
            }
        } else {
            collisions = 0;
        }
    }

    $("#messageBoxStatus").text("Scrolling page to load collection...");
    var loadingInterval = setInterval(loadAllRows, 100);
    var checkingInterval = setInterval(checkLoading, 250);


    var totalMarked = 0;
    var markItems = function() {
        var rows = $(clickSelectorAllRows).slice(0, 5); // Process 5 at a time

        if (rows.length === 0) {
            clearInterval(markingInterval);
            $("#messageBoxStatus").html("Finished marking " + totalMarked + " songs!<br>Reloading in 5 seconds...");
            setTimeout(function(){location.reload();}, 5000);
            return;
        }

        rows.each(function() {
            $(this).click();
            $(".Menu").each(function() {
                if (parseInt($(this).css('top')) > 0 && parseInt($(this).css('left')) > 0) {
                    var syncToMobile = $($(this).find(clickSelectorSyncButton));
                    syncToMobile.click();
                    totalMarked++;
                    $("#marking-percentage").text(Math.round(totalMarked/numberNotSynced * 100));
                    $(this).remove();
                }
            });
        });
    }
})();
