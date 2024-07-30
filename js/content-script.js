// const ws = new WebSocket('ws://localhost:9696');
// ws.onopen = function () {
//     console.log("Connected")
//   };

$(document).ready(function () {
  $("#webPrint, .olorinPlugin").on("click", function (event) {
    var printer = $(this).data("printer");
    var printDiv = $(this).data("print");
    console.log(printer);
    console.log(printDiv);

    // fetch printer name , page width and height corresponding to that printer
    chrome.storage.local
      .get([
        printer,
        printer + "_width",
        printer + "_height",
        printer + "_margin_top",
        printer + "_margin_right",
        printer + "_margin_left",
        printer + "_margin_bottom",
        printer + "_orientation",
      ])
      .then((value) => {
        console.log(value);
        var pageWidthVariable = printer + "_width";
        var pageHeightVariable = printer + "_height";
        var pageWidth = 0;
        var pageHeight = 0;
        if (value && value[pageWidthVariable]) {
          pageWidth = value[pageWidthVariable];
        }
        if (value && value[pageHeightVariable]) {
          pageHeight = value[pageHeightVariable];
        }
        var marginTopVar = printer + "_margin_top";
        var marginRightVar = printer + "_margin_right";
        var marginLeftVar = printer + "_margin_left";
        var marginBottomVar = printer + "_margin_bottom";
        var orientationVVar = printer + "_orientation";

        var marginTop = 0;
        var marginRight = 0;
        var marginLeft = 0;
        var marginBottom = 0;
        var orientation = "";

        if (value && value[marginTopVar]) {
          marginTop = value[marginTopVar];
        }
        if (value && value[marginRightVar]) {
          marginRight = value[marginRightVar];
        }

        if (value && value[marginLeftVar]) {
          marginLeft = value[marginLeftVar];
        }
        if (value && value[marginBottomVar]) {
          marginBottom = value[marginBottomVar];
        }
        if (value && value[orientationVVar]) {
          orientation = value[orientationVVar];
        }
        console.log(
          marginTop,
          marginRight,
          marginLeft,
          marginBottom,
          orientation
        );

        if (value && value[printer]) {
          var printerName = value[printer];
          var printContent = $(printDiv).html();
          if (printContent && printerName) {
            const ws = new WebSocket("ws://localhost:9696");
            ws.onopen = function () {
              const message = {
                id: "print",
                text: "printer-command",
                content: printContent,
                printer: printerName,
                pageWidth: pageWidth,
                pageHeight: pageHeight,
                marginTop: marginTop,
                marginRight: marginRight,
                marginLeft: marginLeft,
                marginBottom: marginBottom,
                orientation: orientation,
              };
              ws.send(JSON.stringify(message));
            };
            // check if message is received
            ws.onmessage = function (event) {
              const data = JSON.parse(event.data);
              // Check the identifier or unique property
              if (data.id === "printerList") {
                // updatePrinter(data)
              }
            };
          }
        }
      });
  });
});
