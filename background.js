chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    })
})

const SPX_URL = 'https://system.spektrix.com'

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(SPX_URL)) {
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id})
        const nextState = prevState === 'ON' ? 'OFF':'ON'

        await chrome.action.setBadgeText({
            tabId: tab.id,
            text:nextState,
        })

        if (nextState === "ON") {
            await chrome.scripting.executeScript({
                files: ["tooltipContent.js"],
                target: { tabId: tab.id}
            })
            await chrome.scripting.insertCSS({
                files: ["tooltip.css"],
                target: { tabId: tab.id}
            })
        } else if (nextState === "OFF") {
            await chrome.scripting.removeCSS({
                files: ["tooltip.css"],
                target: { tabId: tab.id}
            })
        }

    }
})