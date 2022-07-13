/* 
	Example for using the french number converter
*/
window.onload= function(){
	document.getElementById("convertButton").onclick= convert;
}

function convert(e){
	var xNumbers= (document.getElementById("inputField").value).split(",");
	
	var outputNumbers=[];
	var converter= new num2word();
	
	for(var i=0;i<xNumbers.length;i++){
		outputNumbers.push(converter.convert(xNumbers[i].trim()));
	}
	
	document.getElementById("outputField").value=outputNumbers.join(",\n");
}