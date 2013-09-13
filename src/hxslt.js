/*
 * Massimiliano Leone - maximilianus@gmail.com - 2009, GPL licence
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
