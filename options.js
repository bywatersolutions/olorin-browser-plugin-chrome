  
$(document).ready(function() {
  // Create a WebSocket connection to the server
  const ws = new WebSocket('ws://localhost:9696');
  // var storage = chrome.storage.local;
  // Send the content of the div to the server
  ws.onopen = function () {
    const message = {
    id: 'printerList',
    text: 'list-printer'
  };
    ws.send(JSON.stringify(message));
  };
  var selectElement = $("#receipt_printer_option,#sticker_printer_option,#paper_printer_option,#full_sheet_printer_option,#label_printer_option");

// check if message is received
ws.onmessage = function(event) {
  const data = JSON.parse(event.data);
   // Check the identifier or unique property
    if (data.id === 'printerList') {
        updatePrinter(data)
    } 
};
  // Hide save message
  $('#save-msg').addClass('hide')
  $("#printer").on("submit", function(event) {
    event.preventDefault();
    const printer_1 = $('#receipt_printer_option').val();
    const printer_2 = $('#sticker_printer_option').val();
    const printer_3 = $('#paper_printer_option').val();
    const printer_4 = $('#full_sheet_printer_option').val();
    const printer_5 = $('#label_printer_option').val();
    chrome.storage.local.set({
      "receipt_printer": printer_1,
      "sticker_printer": printer_2,
      "paper_printer": printer_3,
      "full_sheet_printer": printer_4,
      "label_printer": printer_5
    });
    $('#save-msg').removeClass('hide')
    setTimeout(function(){ $('#save-msg').addClass('hide')}, 3000);
  })

  $("#refresh").on("click", function(event) {
     const message = {
      id: 'printerList',
      text: 'list-printer'
    };
    console.log(message)
    ws.send(JSON.stringify(message));
  })

  //function to update printer list
  function updatePrinter(printerList){
    var lists = printerList.printer
    selectElement.empty();
      lists.forEach(element => {
        var option = $("<option />").val(element.name).text(element.name);
        selectElement.append(option);
      });
      chrome.storage.local.get("receipt_printer", function(value) {
        if(value && value.receipt_printer)
          $("#receipt_printer_option").val(value.receipt_printer);
      });

      chrome.storage.local.get("sticker_printer", function(value) {
        if(value && value.sticker_printer)
          $("#sticker_printer_option").val(value.sticker_printer);
      });
      
      chrome.storage.local.get("paper_printer", function(value) {
        if(value && value.paper_printer)
          $("#paper_printer_option").val(value.paper_printer);
      });
      
      chrome.storage.local.get("full_sheet_printer", function(value) {
        if(value && value.full_sheet_printer)
          $("#full_sheet_printer_option").val(value.full_sheet_printer);
      });

      chrome.storage.local.get("label_printer", function(value) {
        if(value && value.label_printer)
          $("#label_printer_option").val(value.label_printer);
      });
  }
})