/*
Copyleft 2009 Massimiliano Leone - maximilianus@gmail.com .

xslt.js is part of 'optimus prime'.

'optimus prime' is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 3 of the License, or
(at your option) any later version.

'optimus prime' is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU General Public License
along with 'optimus prime'; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA
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
