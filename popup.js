document.addEventListener('DOMContentLoaded', () => {
    console.log('Popup DOM fully loaded and parsed');
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      console.log('Active tab:', tabs[0]);
      chrome.tabs.sendMessage(tabs[0].id, {action: 'parseWebpage'}, (response) => {
        console.log('Response received:', response);
        if (chrome.runtime.lastError) {
          console.error('Runtime error:', chrome.runtime.lastError);
          return;
        }
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <h3>Title:</h3>
          <p>${response.title || 'N/A'}</p>
          <h3>Description:</h3>
          <p>${response.description}</p>
          <h3>Links (${response.links.length}):</h3>
          <pre>${JSON.stringify(response.links, null, 2)}</pre>
        `;
      });
    });
  });