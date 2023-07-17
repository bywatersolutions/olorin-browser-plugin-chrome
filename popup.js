const socket = new WebSocket("ws://localhost:9696");
$('#connecting').show()
$('#connected').hide()
$('#not_connected').hide()
socket.onconnect = function(event) {
  console.log("Connected to server");
  $('#connected').show()
  $('#not_connected').hide()
  $('#connecting').hide()
};
socket.onerror = function(event) {
  console.log("WebSocket error: ", event);
  $('#not_connected').show()
  $('#connected').hide()
  $('#connecting').hide()
};

socket.onopen = function() {
  $('#connected').show()
  $('#not_connected').hide()
  $('#connecting').hide()
};

// setting button click
var settingURL = chrome.runtime.getURL("options.html") 

// Add a click event listener to the document
document.addEventListener('click', (event) => {
  console.log(event.target.className)
  // Check if the clicked element has the desired button class
  if (event.target && event.target.className === 'option-btn') {
    // Create a new tab with the settings URL
    chrome.tabs.create({ url: settingURL });
  }
});