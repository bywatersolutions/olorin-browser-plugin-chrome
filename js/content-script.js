// const ws = new WebSocket('ws://localhost:9696');
// ws.onopen = function () {
//     console.log("Connected")
//   };

 $(document).ready(function() {
	$("#webPrint").on("click", function(event) {
		var printer = $(this).data('printer');
		var printDiv = $(this).data('print');
		console.log(printer)
		console.log(printDiv)


	    chrome.storage.local.get(printer).then(value => {
		  if(value && value[printer]){
		  	var printerName = value[printer]
		  	var printContent = $(printDiv).html()
		  	if(printContent && printerName){
		  		const ws = new WebSocket('ws://localhost:9696');
		  		ws.onopen = function () {
				    const message = {
					    id: 'print',
					    text: 'printer-command',
					    content:printContent,
					    printer:printerName
					  };
					    ws.send(JSON.stringify(message));
				  };
				  // check if message is received
					ws.onmessage = function(event) {
					  const data = JSON.parse(event.data);
					   // Check the identifier or unique property
					    if (data.id === 'printerList') {
					        // updatePrinter(data)
					    } 
					};
		  	}
		  }
		});

	}) 	
 })