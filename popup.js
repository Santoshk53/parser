document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'parseWebpage'}, (response) => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <h3>Title:</h3>
          <p>${response.title}</p>
          <h3>Description:</h3>
          <p>${response.description}</p>
          <h3>Links (${response.links.length}):</h3>
          <pre>${JSON.stringify(response.links, null, 2)}</pre>
        `;
      });
    });
  });