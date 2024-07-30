const field_names = [
  "full_sheet_printer",
  "full_sheet_printer_height",
  "full_sheet_printer_margin_bottom",
  "full_sheet_printer_margin_left",
  "full_sheet_printer_margin_right",
  "full_sheet_printer_margin_right",
  "full_sheet_printer_margin_top",
  "full_sheet_printer_orientation",
  "full_sheet_printer_width",
  "label_printer",
  "label_printer_height",
  "label_printer_margin_bottom",
  "label_printer_margin_left",
  "label_printer_margin_right",
  "label_printer_margin_top",
  "label_printer_orientation",
  "label_printer_width",
  "paper_printer",
  "paper_printer_height",
  "paper_printer_margin_bottom",
  "paper_printer_margin_left",
  "paper_printer_margin_right",
  "paper_printer_margin_top",
  "paper_printer_orientation",
  "paper_printer_width",
  "receipt_printer",
  "receipt_printer_height",
  "receipt_printer_margin_bottom",
  "receipt_printer_margin_left",
  "receipt_printer_margin_right",
  "receipt_printer_margin_top",
  "receipt_printer_orientation",
  "receipt_printer_width",
  "sticker_printer",
  "sticker_printer_height",
  "sticker_printer_margin_bottom",
  "sticker_printer_margin_left",
  "sticker_printer_margin_right",
  "sticker_printer_margin_top",
  "sticker_printer_orientation",
  "sticker_printer_width",
];

$(document).ready(function () {
  console.log("Options Page Loaded! 4");
  // Create a WebSocket connection to the server
  const ws = new WebSocket("ws://localhost:9696");
  // var storage = chrome.storage.local;
  // Send the content of the div to the server
  ws.onopen = function () {
    const message = {
      id: "printerList",
      text: "list-printer",
    };
    ws.send(JSON.stringify(message));
  };
  var selectElement = $(
    "#receipt_printer,#sticker_printer,#paper_printer,#full_sheet_printer,#label_printer"
  );

  // check if message is received
  ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    // Check the identifier or unique property
    if (data.id === "printerList") {
      updatePrinter(data);
      updatePageSize();
    }
  };

  // Hide save message
  $("#save-msg").addClass("hide");

  $(function () {
    $("#printer").on("submit", function (event) {
      event.preventDefault();

      //FIXME: replace all "label_printer" with "label_printer", etc and use loops for everything
      let data = {};
      for (const field_name of field_names) {
        const elts = document.getElementsByName(field_name);
        const elt = elts[0];
        console.log(elt);
        const val = elt.value;
        console.log(field_name, val);
        data[field_name] = val;
      }

      console.log("CONFIGURATION:", data);
      //chrome.storage.local.set(data);
      const ws = new WebSocket("ws://localhost:9696");
      ws.onopen = function () {
        const message = {
          id: "set-options",
          text: "set-options",
          options: data,
        };
        ws.send(JSON.stringify(message));
      };
      // check if message is received
      ws.onmessage = function (event) {
        const response = JSON.parse(event.data);
        console.log("SET-OPTION RESPONSE: ", response);
        //FIXME: Add some kind of spinner for feedback
      };
    });
  });

  $("#refresh").on("click", function (event) {
    const message = {
      id: "printerList",
      text: "list-printer",
    };
    console.log(message);
    ws.send(JSON.stringify(message));
  });

  //function to update printer list
  function updatePrinter(printerList) {
    var lists = printerList.printer;
    selectElement.empty();
    lists.forEach((element) => {
      var option = $("<option />").val(element.name).text(element.name);
      selectElement.append(option);
    });
    chrome.storage.local.get("receipt_printer", function (value) {
      if (value && value.receipt_printer)
        $("#receipt_printer").val(value.receipt_printer);
    });

    chrome.storage.local.get("sticker_printer", function (value) {
      if (value && value.sticker_printer)
        $("#sticker_printer").val(value.sticker_printer);
    });

    chrome.storage.local.get("paper_printer", function (value) {
      if (value && value.paper_printer)
        $("#paper_printer").val(value.paper_printer);
    });

    chrome.storage.local.get("full_sheet_printer", function (value) {
      if (value && value.full_sheet_printer)
        $("#full_sheet_printer").val(value.full_sheet_printer);
    });

    chrome.storage.local.get("label_printer", function (value) {
      if (value && value.label_printer)
        $("#label_printer").val(value.label_printer);
    });
  }

  // function to set the page size if already saved
  function updatePageSize() {
    const ws = new WebSocket("ws://localhost:9696");
    ws.onopen = function () {
      const message = {
        id: "get-options",
        text: "get-options",
      };
      ws.send(JSON.stringify(message));
    };
    // check if message is received
    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log("GET-OPTIONS RESPONSE: ", data);
      for (const field_name of field_names) {
        const elts = document.getElementsByName(field_name);
        const elt = elts[0];
        console.log(elt);
        elt.value = data[field_name];
        console.log("SET", elt, "VALUE TO ", data[field_name]);
      }
    };
  }
});
