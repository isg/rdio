if (jQuery && R && $(".section.rdioagent").length === 0) {
    /*****************************
     *
     * Setup UI
     *
     ****************************/
    function createUI() {
        // Remember position of navigation bar (for repositioning)
        var height = $(".scroll_content").first().height();

        // Append new controller at end of navigation (to avoid damaging Rdio menus)
        $(".scroll_content").first().append('<div class="section rdioagent">\
                <div class="small_title">\
                    Rdio Agent (by <a href="http://www.goldberg.io" style="display: inline">goldberg.io</a>)\
                </div>\
                <ul class="main_nav rdioagent">\
                    <li>\
                        <a class="rdioagent_icon rdioagent_icon_sync" href="#">Loading...<br/>Please wait...</a>\
                    </li>\
                    <li>\
                        <a class="rdioagent_icon rdioagent_icon_unsync" href="#">Loading...<br/>Please wait...</a>\
                    </li>\
                    <li>\
                        <a class="rdioagent_icon rdioagent_icon_addsong" href="#">Add current song<br/>to collection</a>\
                    </li>\
                </ul>\
            </div>\
        ');

        var newHeight = $(".scroll_content").first().height();

        // Now rearrange so that we're at the top!
        $("div.rdioagent").width($(".section.browse").width());
        $("div.rdioagent").css({
            "position": "relative",
            "top": -newHeight
        });
        $(".section.browse").css({
            'margin-top':  $(".section.rdioagent").height() + 20
        });

        $(".scroll_content").first().height(newHeight);

        // Now style our beautiful injected menu
        restoreBackgrounds = function() {
            $("a.rdioagent_icon").css({
                'background-repeat': 'no-repeat',
                'background-position': '5px center',
                'padding-left': 33
            });
            $("a.rdioagent_icon_sync").css({
                'background-image': "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAALGPC/xhBQAAAF1QTFRF/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8Z/n8ZAAAA/9Cq/8id/+XR/93C/////n8ZmtAkQgAAABl0Uk5TQilH2Nf0+kOZ27/d3KJERvA/mvnyxwEoAE2DC8UAAACASURBVBjTbZBZDoMwDAVfV3YC2aGQ+x+TOAmocjuSI3vy82x4AnWjVFNXeYjl2lBoXVazDhd6JuWm8MXkPKyhbvlEFuqMxZg+90RqR8isridI9Fz1UFwp6F/14KrDwNWAOw8hStR1i6wlKl/o9n/teBxzGlOO470Vsnu/nlJYmg4XwiEYfYaI5AAAAABJRU5ErkJggg==)",
            });
            $("a.rdioagent_icon_unsync").css({
                'background-image': "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAALGPC/xhBQAAAJ9QTFRFTrtETrtETrtETrtETrtETrtETrtETrtETrtETrtETrtETrtETrtETrtETrtETrtETrtETrtETrtETrtETrtETrtETrtETrtEAAAAYsNZoNqbmdiThdB+/v/+nNmXx+rEnNmWT7tFntqYo9yew+i//v7+qN6jsuGur+Cr5/bmoducbcdkXMBTpNyf0u7Ppd2gtuOyUbxI////9/z2TrtEd8yVYwAAABl0Uk5TR9jXQin6Q/Siv0SZ29zdRvCaP/L5xwEoAMmTD0wAAACdSURBVBjTbVAHDsMgELvubELC6kz3ngn/f1uBEppWsYQtWxzcHQiNXhgREoVDY0Ad7ksLn3+iLJcOeaYjnsoGUi6AUfkDyiBo2NdTUQD4m1zvD8UYYpdcTjctMZA6mVVnowR0B8VYrja7ibRRR/G+WmzLtb2dgKflWM6X9QMegNHD1P2C2lr9H6jfPrZajquldjlCMISTwaiLEdPuDcmIMmlr2SEmAAAAAElFTkSuQmCC)"
            });
            $("a.rdioagent_icon_addsong").css({
                'background-image': "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABsklEQVR42mNkwAL6j/D9RxcrtPnEiE0tIy4DMkyfMzximM0gx5DKMOO0JOkGqCs5Mnz5+pJBgE+W4ertnaQboCJvzfD12xsGPl5Jhpv3DpBmQO8hgf+KsvoMP399ZuDmFGW4ff8kQ7H9B+wGdO0T/g8zihHIgoWevIwyw++/Pxk42fkY7j64hmIjTE2Z01tGxvZd4v8L7O+BAwwGQAG37r4Vw9+/fxiYmJgZgpWOY8hPOKjEUOn2kpGxeZv0fyV5WYZf/9+DzYa4ghHFRci2gthsTGIMdx/eY6j1esrIWL9R8b+SEi/Dn39fkFTCdDNCxaDGgEPhPwM7kwjD7buvGRr97zMyVq9R/Y/qOUYGRqBmeeVfUNv/Mzy4yw5R8J8ByS0MDK0htxmxhmz5Cq3/imofIByg+ge3BRg6Iq6hqG3doidb7XPpMVYDSpbo/VfUeAm2HQTu3ZBg6Im5RHw6KFxg9F9Z+yHY6yAFd6/LM/THnyPegPx5Jv8tLDng/BPHfzBMTDpDtAGiQANeoQsCDRDwSGb/CmQyAfGfHXN//sNmgDgQCwAxNxDzocndgtLPkAUBoVCmEQC9pesAAAAASUVORK5CYII=)",
                'background-position': '7px center'
            });
        };
        restoreBackgrounds();

        syncLink = $("a.rdioagent_icon_sync").first();
        unsyncLink = $("a.rdioagent_icon_unsync").first();
        addLink = $("a.rdioagent_icon_addsong").first();
    }

    /*****************************
     *
     * Load Collection and Setup
     *
     ****************************/

    // This will be populated after the AJAX call
    var totalNumSongsSynced = 0;
    var totalNumSongsUnsynced = 0;
    var songsSynced = [];
    var songsUnsynced = [];
    var syncLink = null;
    var unsyncLink = null;
    var restoreBackgrounds = null;

    function updateWithRdio(callback) {
        // Will send true or false to callback depending on success

        // Reset vars
        totalNumSongsSynced = 0;
        totalNumSongsUnsynced = 0;
        songsSynced = [];
        songsUnsynced = [];

        // Get all keys in collection (to determine if they're synced or not)
        $.ajax({
            type: "POST",
            url: "http://www.rdio.com/api/1/getKeysInCollection",
            data: {
                "method": "getKeysInCollection",
                "extras[]": "*.WEB",
                "_authorization_key": R.currentUser.get("authorizationKey"),
            }
        }).done(function(data) {
            console.log("Rdio Agent -- Fetched which tracks are synced already.");
            for (var i in data.result.online) {
                if (data.result.online[i][0] == "t") {
                    songsUnsynced.push(data.result.online[i]);
                    totalNumSongsUnsynced++;
                }
            }
            for (var i in data.result.offline) {
                if (data.result.offline[i][0] == "t") {
                    songsSynced.push(data.result.offline[i]);
                    totalNumSongsSynced++;
                }
            }

            callback(true);
        }).fail(function(data) {
            console.log("Rdio Agent -- Failed to determine which tracks are already synced.")
            callback(false);
        });
    }


    /*****************************
     *
     * Setup Events
     *
     ****************************/

    function updateUI() {
        // Update UI
        syncLink.html("Sync <b>" + totalNumSongsUnsynced + "</b> unsynced<br/>songs in collection");
        unsyncLink.html("Unsync <b>" + totalNumSongsSynced + "</b> synced<br/>songs in collection");

        // Update positioning
        $(".section.browse").css({
            'margin-top':  $(".section.rdioagent").height() + 20
        });
    }

    function setupEvents() {
        var loadingUrl = "url(data:image/gif;base64,R0lGODlhEAAQAPQAAP///4CAgPv7+5ubm8HBwYKCgpKSkurq6tPT04qKirq6urKysvHx8cvLy+Li4qOjo6qqqgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==)";

        setInterval(function() {
            updateWithRdio(function(success) {
                if (!success) {
                    console.log("Rdio Agent -- Error, couldn't update!");
                } else {
                    updateUI();
                }
            });
        }, 3000); // Every 3 seconds, stay in sync

        var linkClickFunction = function(list, link, offline) {
            var otherList = list === songsUnsynced ? songsSynced : songsUnsynced;
            if (list.length > 0) {
                syncLink.unbind("click");
                unsyncLink.unbind("click");
                addLink.unbind("click");

                // Start pinwheel
                link.css({
                    "background-image": loadingUrl,
                    'background-position': '7px center'
                });

                $.ajax({
                    type: "POST",
                    url: "http://www.rdio.com/api/1/setAvailableOffline",
                    data: {
                        "offline": offline,
                        "extras[]": "*.WEB",
                        "method": "setAvailableOffline",
                        "_authorization_key": R.currentUser.get("authorizationKey"),
                        "keys[]": list
                    }
                }).done(function(data) {
                    console.log("Rdio Agent -- Marked " + list.length + " songs to be " + (offline ? "synced" : "unsynced") + ".");
                    // Move to other dictionary
                    $.merge(otherList, list);
                    totalNumSongsSynced += offline ? list.length : -list.length;
                    totalNumSongsUnsynced += offline ? -list.length : list.length;
                    list.splice(0);
                    updateUI();
                }).fail(function(data) {
                    console.log("Rdio Agent -- Failed to mark " + list.length + " songs to be " + (offline ? "synced" : "unsynced") + ".");
                }).always(function(data) {
                    restoreBackgrounds();
                    createListeners();
                });
            }
        }

        var createListeners = function() {
            syncLink.click(function() {
                linkClickFunction(songsUnsynced, syncLink, true);
            });

            unsyncLink.click(function() {
                linkClickFunction(songsSynced, unsyncLink, false);
            });

            addLink.click(function() {
                // If a track is loaded
                if (R.player.playingTrack() && R.player.playingTrack().attributes && songsUnsynced.indexOf(R.player.playingTrack().attributes.key) === -1 && songsSynced.indexOf(R.player.playingTrack().attributes.key) === -1) {
                    var trackKey = R.player.playingTrack().attributes.key;

                    syncLink.unbind("click");
                    unsyncLink.unbind("click");
                    addLink.unbind("click");

                    // Start pinwheel
                    addLink.css({
                        "background-image": loadingUrl,
                        'background-position': '7px center'
                    });

                    $.ajax({
                        type: "POST",
                        url: "http://www.rdio.com/api/1/addToCollection",
                        data: {
                            "extras[]": "*.WEB",
                            "method": "addToCollection",
                            "_authorization_key": R.currentUser.get("authorizationKey"),
                            "keys[]": trackKey
                        }
                    }).done(function(data) {
                        console.log("Rdio Agent -- Added track to collection.");
                        songsUnsynced.push(trackKey);
                        totalNumSongsUnsynced += 1;
                        updateUI();
                    }).fail(function(data) {
                        console.log("Rdio Agent -- Failed to add track to collection.");
                    }).always(function(data) {
                        restoreBackgrounds();
                        createListeners();
                    });
                }
            });
        }
        createListeners();
    }

    /*****************************
     *
     * Run!
     *
     ****************************/
    // Initialize
    createUI();
    updateWithRdio(function(success) {
        if (success) {
            setupEvents();
            updateUI();
        }
    });
}
