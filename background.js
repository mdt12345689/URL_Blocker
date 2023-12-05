chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ blockedUrls: [] });
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    chrome.storage.sync.get(['blockedUrls'], function(result) {
      const blockedUrls = result.blockedUrls || [];
      if (blockedUrls.includes(details.url)) {
        return { cancel: true };
      }
    });
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
