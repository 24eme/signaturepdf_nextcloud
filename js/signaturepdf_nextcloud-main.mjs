const appName = "signaturepdf_nextcloud";
const appVersion = "1.0.0";
let iframe = document.getElementById("iframe_pdf");
iframe.onload = function() {
};
window.addEventListener("message", async function(event) {
  if (event.data.action === "exit") {
    window.history.back();
  }
  if (event.data.action === "getDavToken") {
    let response = await fetch(iframe.dataset.tokenUrl);
    iframe.contentWindow.postMessage({
      action: "davOpenFile",
      key: "token",
      value: (await response.json()).token
    }, "*");
  }
});
//# sourceMappingURL=signaturepdf_nextcloud-main.mjs.map
