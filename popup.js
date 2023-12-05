document.addEventListener('DOMContentLoaded', function() {
  const urlTextarea = document.getElementById('urlTextarea');
  const blockUrlsBtn = document.getElementById('blockUrlsBtn');
  const blockedUrlsList = document.getElementById('blockedUrlsList');

  blockUrlsBtn.addEventListener('click', function() {
    const inputUrls = urlTextarea.value.trim().split('\n');

    inputUrls.forEach(newUrl => {
      const trimmedUrl = newUrl.trim();
      if (trimmedUrl !== '') {
        blockUrl(trimmedUrl);
      }
    });

    urlTextarea.value = '';
  });

  function blockUrl(url) {
    chrome.storage.sync.get(['blockedUrls'], function(result) {
      const blockedUrls = result.blockedUrls || [];
      blockedUrls.push(url);

      chrome.storage.sync.set({ blockedUrls: blockedUrls }, function() {
        const listItem = document.createElement('li');
        listItem.textContent = url;
        blockedUrlsList.appendChild(listItem);
      });
    });
  }
});
