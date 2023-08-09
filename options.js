  
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
        updatePageSize()
    } 
};
  // Hide save message
  $('#save-msg').addClass('hide')
  $(function() {
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
      const printer_1_width = $('input[name="receipt_printer_width"]').val();
      const printer_1_height = $('input[name="receipt_printer_height"]').val();
      const printer_2_width = $('input[name="sticker_printer_width"]').val();
      const printer_2_height = $('input[name="sticker_printer_height"]').val();
      const printer_3_width = $('input[name="paper_printer_width"]').val();
      const printer_3_height = $('input[name="paper_printer_height"]').val();
      const printer_4_width = $('input[name="full_sheet_printer_width"]').val();
      const printer_4_height = $('input[name="full_sheet_printer_height"]').val();
      const printer_5_width = $('input[name="label_printer_width"]').val();
      const printer_5_height = $('input[name="label_printer_height"]').val();
      chrome.storage.local.set({
        "receipt_printer_width": printer_1_width,
        "receipt_printer_height": printer_1_height,
        "sticker_printer_width": printer_2_width,
        "sticker_printer_height": printer_2_height,
        "paper_printer_width": printer_3_width,
        "paper_printer_height": printer_3_height,
        "full_sheet_printer_width":printer_4_width,
        "full_sheet_printer_height":printer_4_height,
        "label_printer_width":printer_5_width,
        "label_printer_height":printer_5_height

      });
      // save margin and orientation
      const printer_1_margin_top = $('input[name="receipt_printer_margin_top"]').val();
      const printer_1_margin_bottom = $('input[name="receipt_printer_margin_bottom"]').val();
      const printer_1_margin_left = $('input[name="receipt_printer_margin_left"]').val();
      const printer_1_margin_right = $('input[name="receipt_printer_margin_right"]').val();
      const printer_1_orientation = $('select[name="receipt_printer_orientation"]').val();

      const printer_2_margin_top = $('input[name="sticker_printer_margin_top"]').val();
      const printer_2_margin_bottom = $('input[name="sticker_printer_margin_bottom"]').val();
      const printer_2_margin_left = $('input[name="sticker_printer_margin_left"]').val();
      const printer_2_margin_right = $('input[name="sticker_printer_margin_right"]').val();
      const printer_2_orientation = $('select[name="sticker_printer_orientation"]').val();

      const printer_3_margin_top = $('input[name="paper_printer_margin_top"]').val();
      const printer_3_margin_bottom = $('input[name="paper_printer_margin_bottom"]').val();
      const printer_3_margin_left = $('input[name="paper_printer_margin_left"]').val();
      const printer_3_margin_right = $('input[name="paper_printer_margin_right"]').val();
      const printer_3_orientation = $('select[name="paper_printer_orientation"]').val();

      const printer_4_margin_top = $('input[name="full_sheet_printer_margin_top"]').val();
      const printer_4_margin_bottom = $('input[name="full_sheet_printer_margin_bottom"]').val();
      const printer_4_margin_left = $('input[name="full_sheet_printer_margin_left"]').val();
      const printer_4_margin_right = $('input[name="full_sheet_printer_margin_right"]').val();
      const printer_4_orientation = $('select[name="full_sheet_printer_orientation"]').val();

      const printer_5_margin_top = $('input[name="label_printer_margin_top"]').val();
      const printer_5_margin_bottom = $('input[name="label_printer_margin_bottom"]').val();
      const printer_5_margin_left = $('input[name="label_printer_margin_left"]').val();
      const printer_5_margin_right = $('input[name="label_printer_margin_right"]').val();
      const printer_5_orientation = $('select[name="label_printer_orientation"]').val();

      console.log(printer_1_orientation)
      chrome.storage.local.set({
        "receipt_printer_margin_top": printer_1_margin_top,
        "receipt_printer_margin_bottom": printer_1_margin_bottom,
        "receipt_printer_margin_left": printer_1_margin_left,
        "receipt_printer_margin_right": printer_1_margin_right,
        "receipt_printer_orientation": printer_1_orientation,


        "sticker_printer_margin_top": printer_2_margin_top,
        "sticker_printer_margin_bottom": printer_2_margin_bottom,
        "sticker_printer_margin_left": printer_2_margin_left,
        "sticker_printer_margin_right": printer_2_margin_right,
        "sticker_printer_orientation": printer_2_orientation,

        "paper_printer_margin_top": printer_3_margin_top,
        "paper_printer_margin_bottom": printer_3_margin_bottom,
        "paper_printer_margin_left": printer_3_margin_left,
        "paper_printer_margin_right": printer_3_margin_right,
        "paper_printer_orientation": printer_3_orientation,


        "full_sheet_printer_margin_top":printer_4_margin_top,
        "full_sheet_printer_margin_bottom":printer_4_margin_bottom,
        "full_sheet_printer_margin_left":printer_4_margin_left,
        "full_sheet_printer_margin_right":printer_4_margin_right,
        "full_sheet_printer_orientation":printer_4_orientation,


        "label_printer_margin_top":printer_5_margin_top,
        "label_printer_margin_bottom":printer_5_margin_bottom,
        "label_printer_margin_left":printer_5_margin_left,
        "label_printer_margin_right":printer_5_margin_right,
        "label_printer_orientation":printer_5_orientation

      });
      $('#save-msg').removeClass('hide')
      setTimeout(function(){ $('#save-msg').addClass('hide')}, 3000);
    })
});

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
  // function to set the page size if already saved
  function updatePageSize(){
    chrome.storage.local.get(null, function(value) {
      console.log(value)
      if(value){
        if(value.receipt_printer_width)
          $('input[name="receipt_printer_width"]').val(value.receipt_printer_width);
        if(value.receipt_printer_height)
          $('input[name="receipt_printer_height"]').val(value.receipt_printer_height);
        if(value.sticker_printer_width)
          $('input[name="sticker_printer_width"]').val(value.sticker_printer_width);
        if(value.sticker_printer_height)
          $('input[name="sticker_printer_height"]').val(value.sticker_printer_height);
        if(value.paper_printer_width)
          $('input[name="paper_printer_width"]').val(value.paper_printer_width);
        if(value.paper_printer_height)
          $('input[name="paper_printer_height"]').val(value.paper_printer_height);
        if(value.full_sheet_printer_width)
          $('input[name="full_sheet_printer_width"]').val(value.full_sheet_printer_width);
        if(value.full_sheet_printer_height)
          $('input[name="full_sheet_printer_height"]').val(value.full_sheet_printer_height);
        if(value.label_printer_width)
          $('input[name="label_printer_width"]').val(value.label_printer_width);
        if(value.label_printer_height)
          $('input[name="label_printer_height"]').val(value.label_printer_height);

        // margin and orientation start
        if(value.receipt_printer_margin_top)
          $('input[name="receipt_printer_margin_top"]').val(value.receipt_printer_margin_top);
        if(value.receipt_printer_margin_bottom)
          $('input[name="receipt_printer_margin_bottom"]').val(value.receipt_printer_margin_bottom);
        if(value.receipt_printer_margin_left)
          $('input[name="receipt_printer_margin_left"]').val(value.receipt_printer_margin_left);
        if(value.receipt_printer_margin_right)
          $('input[name="receipt_printer_margin_right"]').val(value.receipt_printer_margin_right);
        if(value.receipt_printer_orientation)
          $('select[name="receipt_printer_orientation"]').val(value.receipt_printer_orientation);


        if(value.sticker_printer_margin_top)
          $('input[name="sticker_printer_margin_top"]').val(value.sticker_printer_margin_top);
        if(value.sticker_printer_margin_bottom)
          $('input[name="sticker_printer_margin_bottom"]').val(value.sticker_printer_margin_bottom);
        if(value.sticker_printer_margin_left)
          $('input[name="sticker_printer_margin_left"]').val(value.sticker_printer_margin_left);
        if(value.sticker_printer_margin_right)
          $('input[name="sticker_printer_margin_right"]').val(value.sticker_printer_margin_right);
        if(value.sticker_printer_orientation)
          $('select[name="sticker_printer_orientation"]').val(value.sticker_printer_orientation);


        if(value.paper_printer_margin_top)
          $('input[name="paper_printer_margin_top"]').val(value.paper_printer_margin_top);
        if(value.paper_printer_margin_bottom)
          $('input[name="paper_printer_margin_bottom"]').val(value.paper_printer_margin_bottom);
        if(value.paper_printer_margin_left)
          $('input[name="paper_printer_margin_left"]').val(value.paper_printer_margin_left);
        if(value.paper_printer_margin_right)
          $('input[name="paper_printer_margin_right"]').val(value.paper_printer_margin_right);
        if(value.paper_printer_orientation)
          $('select[name="paper_printer_orientation"]').val(value.paper_printer_orientation);


        if(value.full_sheet_printer_margin_top)
          $('input[name="full_sheet_printer_margin_top"]').val(value.full_sheet_printer_margin_top);
        if(value.full_sheet_printer_margin_bottom)
          $('input[name="full_sheet_printer_margin_bottom"]').val(value.full_sheet_printer_margin_bottom);
        if(value.full_sheet_printer_margin_left)
          $('input[name="full_sheet_printer_margin_left"]').val(value.full_sheet_printer_margin_left);
        if(value.full_sheet_printer_margin_right)
          $('input[name="full_sheet_printer_margin_right"]').val(value.full_sheet_printer_margin_right);
        if(value.full_sheet_printer_orientation)
          $('select[name="full_sheet_printer_orientation"]').val(value.full_sheet_printer_orientation);
        

        if(value.label_printer_margin_top)
          $('input[name="label_printer_margin_top"]').val(value.label_printer_margin_top);
        if(value.label_printer_margin_bottom)
          $('input[name="label_printer_margin_bottom"]').val(value.label_printer_margin_bottom);
        if(value.label_printer_margin_left)
          $('input[name="label_printer_margin_left"]').val(value.label_printer_margin_left);
        if(value.label_printer_margin_right)
          $('input[name="label_printer_margin_right"]').val(value.label_printer_margin_right);
        if(value.label_printer_orientation)
          $('select[name="label_printer_orientation"]').val(value.label_printer_orientation);
      }
    });
  }
})