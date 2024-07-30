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
  // Create a WebSocket connection to the server
  const ws = new WebSocket("ws://localhost:9696");

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
      updateFormValues();
    }
  };

  // Hide save message
  $("#save-msg").addClass("hide");
  $("#saveData").on("blur", function(){
    $("#save-msg").addClass("hide");
  });

  $(function () {
    $("#printer").on("submit", function (event) {
      event.preventDefault();

      //FIXME: replace all "label_printer" with "label_printer", etc and use loops for everything
      let data = {};
      for (const field_name of field_names) {
        const elts = document.getElementsByName(field_name);
        const elt = elts[0];
        const val = elt.value;
        console.log("FIELD NAME ", field_name, "VALUE IS", val);
        data[field_name] = val;
      }

      console.log("CONFIGURATION:", data);
      
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
        $("#save-msg").removeClass("hide");
      };
    });
  });

  $("#refresh").on("click", function (event) {
    const message = {
      id: "printerList",
      text: "list-printer",
    };
    console.log("LIST-PRINTER RESPONSE:", message);
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
  }

  // function to set the page size if already saved
  function updateFormValues() {
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
