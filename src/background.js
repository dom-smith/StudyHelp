
filter = [
    { hostContains: "netflix.com" },
    { hostContains: "disneyplus.com" },
    { hostContains: "youtube.com" },
    { hostContains: "discord.com" },
    { hostContains: "instagram.com" },
    { hostContains: "twitter.com" },
    { hostContains: "twitch.tv" },
    { hostContains: "tiktok.com" },
    { hostContains: "hbomax.com" },
    { hostContains: "hulu.com" },
];

chrome.webNavigation.onBeforeNavigate.addListener(
    (details) => {
        chrome.storage.sync.get({ mode: false }, function (modeResult) {
            if (modeResult.mode) {
                chrome.storage.sync.get(
                    { endSnooze: null },
                    function (snoozeResult) {
                        console.log(snoozeResult);

                        console.log(
                            new Date(snoozeResult.endSnooze),
                            "<",
                            new Date()
                        );

                        if (
                            !snoozeResult.endSnooze ||
                            new Date(snoozeResult.endSnooze) < new Date()
                        ) {
                            chrome.tabs.update(details.tabId, {
                                url: chrome.runtime.getURL(
                                    "/html/altPage.html"
                                ),
                            });
                        }
                    }
                );
            }
        });
    },
    { url: filter }
);
