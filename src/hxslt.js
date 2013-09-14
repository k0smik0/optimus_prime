/*
Copyleft 2009 Massimiliano Leone - maximilianus@gmail.com .

hxslt.js is part of 'optimus prime'.

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


/*
 * A xml to html via xslt transformer - in nomen omen ;D
 * 
 * More, it try to retrieve xsl document via ajax - yes, we love ajax :D 
 *   
 */
function KXSLTransformer(xml,xsl) {}
KXSLTransformer.prototype = {	
	setXML: function(xml){
		this._xml = xml;
	},
	setXSL: function(xsl){
		var xhrHandler = new XHRHandler();
		if (xhrHandler != null) { // ahaaah! - ajax rulez					
			this._xhr = xhrHandler.getXHR();
			
			var xt = this;
			this._xhr.onreadystatechange = function(){
				xt._completeRequest();
			}
			this._xhr.open("GET", xsl, true);
			this._xhr.send(null);
		}
		else { // no ajax support - download a decent browser! -> www.mozilla.org 
			this._xsl = xsl;
		}				
	},
	convert: function() {
		if (window.ActiveXObject) { // code for InternetExplooooDer
		    var out = this._xml.transformNode(this._xsl);
			return out;		    
		} 
		else if (document.implementation && document.implementation.createDocument) { // code for Mozilla, Firefox, Opera, etc.
		    var xsltProcessor = new XSLTProcessor();
		    xsltProcessor.importStylesheet(this._xsl);
		    var out = xsltProcessor.transformToFragment(this._xml,document);
		    return out;
		}
		return this._xml;
	},
	_completeRequest: function() {
		if (this._xhr.readyState === 4) {
			if (this._xhr.status === 200 || this._xhr.status === 304) {
				this._xsl = this._xhr.responseXML;				
			}
		}
	}
}
