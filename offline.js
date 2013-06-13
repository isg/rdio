// Isaac Goldberg
// http://www.goldberg.io
// Rdio Offline Agent

(function() {
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
                $("#messageBoxStatus").text("Loading complete. Marking items...");
                markItems();
            }
        } else {
            collisions = 0;
        }
    }
    $("#messageBoxStatus").text("Scrolling page to load collection...");
    var loadingInterval = setInterval(loadAllRows, 100);
    var checkingInterval = setInterval(checkLoading, 250);

    var markItems = function() {
        var rows = $(".ActionMenu:not(.synced)");
        var marked = 0;
        rows.each(function() {
            $(this).click();
            $(".Menu").each(function() {
                if (parseInt($(this).css('top')) > 0 && parseInt($(this).css('left')) > 0) {
                    var syncToMobile = $($(this).find("li:contains(Sync to Mobile)").first());
                    syncToMobile.click();
                    marked++;
                }
            });
        });

        box.scrollTop(0);
        $("#messageBoxStatus").text("Finished marking " + marked + "songs!<br>Closing in 5 seconds.");
        setTimeout(closePopup, 5000);
    }
})();
