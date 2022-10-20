chrome.runtime.onMessage.addListener(({ message }, sender, response) => {
    console.log('Dcoded B64:', message)
    const selection = document.getSelection();
    selection.focusNode.appendData(` *** DECODED: ${message} *** `);
})