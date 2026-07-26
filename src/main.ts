let iframe = document.getElementById('iframe_pdf');
iframe.onload = function() {
}

window.addEventListener('message', async function(event) {
  if (event.data.action === 'exit') {
    window.history.back();
  }

  if (event.data.action === 'getDavToken') {
    let response = await fetch(iframe.dataset.tokenUrl);
    iframe.contentWindow.postMessage({
        action: 'davOpenFile',
        key: "token",
        value: (await response.json()).token
    }, '*'); // Remplacez '*' par le domaine spécifique pour plus de sécurité
  }
})
