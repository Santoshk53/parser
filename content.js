function parseWebpage() {
    // Extract title
    const title = document.title;
  
    // Extract meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = metaDescription ? metaDescription.getAttribute('content') : 'No description available';
  
    // Extract all links
    const links = Array.from(document.getElementsByTagName('a')).map(link => ({
      text: link.textContent.trim(),
      href: link.href
    }));
  
    return {
      title: title,
      description: description,
      links: links
    };
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'parseWebpage') {
      const parsedData = parseWebpage();
      sendResponse(parsedData);
    }
  });