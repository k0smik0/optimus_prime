/*
 * Massimiliano Leone - maximilianus@gmail.com - 2009, GPL licence
 */

function loadXMLDoc(fname) {
	var xmlDoc;
	// code for IE
	if (window.ActiveXObject) {
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	}
	// code for Mozilla, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument) {
		xmlDoc=document.implementation.createDocument("","",null);
	} else {
		alert('Your browser cannot handle this script');
	}
	xmlDoc.async=false;
	xmlDoc.load(fname);
	return(xmlDoc);
}

function parseXMLDoc(text) { 
    if (typeof DOMParser != "undefined") { 
        // Mozilla, Firefox, and related browsers 
        return (new DOMParser()).parseFromString(text, "application/xml");		 
    } 
    else if (typeof ActiveXObject != "undefined") { 
        // Internet Explorer. 
        var doc = XML.newDocument();  // Create an empty document 
        doc.loadXML(text);            // Parse text into it 
        return doc;                   // Return it 
    }
}; 
	
function convertByXSL(xmltext,xslurl,out) {
	xml = parseXMLDoc(xmltext);
	xsl = loadXMLDoc(xslurl);
	// code for IE
	if (window.ActiveXObject) {
	    ex=xml.transformNode(xsl);
	    document.getElementById(out).innerHTML=ex;
    }
	// code for Mozilla, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument) {
	    xsltProcessor=new XSLTProcessor();
	    xsltProcessor.importStylesheet(xsl);
	    resultDocument = xsltProcessor.transformToFragment(xml,document);
	    document.getElementById(out).appendChild(resultDocument);
	}
}