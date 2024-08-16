$(document).ready(function() {
    $("#webPrint, .olorinPlugin").on("click", function(event) {
        var printer = $(this).data("printer");
        var printDiv = $(this).data("print");
        var printContent = $(printDiv).html();
        console.log("PRINTER: ", printer);
        console.log("CONTENT: ", printDiv);

        const ws = new WebSocket("ws://localhost:9696");
        ws.onopen = function() {
            const message = {
                id: "print",
                text: "printer-command",
                content: printContent,
                printer: printer
            };
            console.log("SENDING");
            ws.send(JSON.stringify(message));
        };
        // check if message is received
        ws.onmessage = function(event) {
            const data = JSON.parse(event.data);
            console.log("RESPONSE: ", data);
        };
    });
});
