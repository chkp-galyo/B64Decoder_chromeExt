chrome.contextMenus.create({
    title: "Decode base64",
    contexts: ["selection"],
    id: "decoder"
})

chrome.contextMenus.onClicked.addListener(({selectionText}, tab) => {
    const decodedB64 = decodeBase64(selectionText);
    if (decodedB64) postMsg(decodedB64, tab);
})

const decodeBase64 = (selectionText, attempt=0) => {
    try {
        return atob(selectionText);
    } catch {
        if (attempt < 4) return decodeBase64(selectionText + '=', ++attempt);
        console.warn('This is not base64 encoded');
        return null;
    }
}

const postMsg = (msg, tab) => {
    chrome.tabs.sendMessage(tab.id, {
        message: msg
    });
}