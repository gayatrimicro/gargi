////////////////////////////////////////////////////////////////////////////////
function isValidDate(day,month,year)
{
	month--;
	var dteDate;
	dteDate=new Date(year,month,day);
	return ((day==dteDate.getDate()) && (month==dteDate.getMonth()) && (year==dteDate.getFullYear()));
}
////////////////////////////////////////////////////////////////////////////////
function checkFloat(cadena)
{
	var poscoma=cadena.indexOf('.');
	if(poscoma < 0){
		if(isNaN(cadena)) return false
		else return true;
	}
	else{
		if(isNaN(cadena.substring(0,poscoma)) || isNaN(cadena.substring(poscoma+1,cadena.length))) return false;
		else return true;
	}
}
////////////////////////////////////////////////////////////////////////////////
function es_identificador(cadena)
{
	if(0==cadena.lenght) return false;
	else{
		var validos="abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ_-0123456789";
		for(i=0;i<cadena.length;i++){
			if( validos.indexOf(cadena.charAt(i)) < 0 ) return false;
		}
		return true;
	}
}
////////////////////////////////////////////////////////////////////////////////
function makeRequest(url)
{
    var http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
            // See note below about this line
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    http_request.onreadystatechange = function() { alertContents(http_request); };
    http_request.open('GET', url, true);
    http_request.send(null);

}
////////////////////////////////////////////////////////////////////////////////
function ventana(url,ancho,alto){
	var resultado;
	resultado=window.open(url,'','width='+ancho+',height='+alto+',top=' + (screen.height-alto)/2 + ',left=' + (screen.width-ancho)/2 + ',scrollbars=0');
	if(!resultado) alert("Popup blocker");
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ventana2(url,ancho,alto){
	var resultado;
	resultado=window.open(url,'','width='+ancho+',height='+alto+',top=' + (screen.height-alto)/2 + ',left=' + (screen.width-ancho)/2 + ',scrollbars=1');
	if(!resultado) alert("Popup blocker");
}
////////////////////////////////////////////////////////////////////////////////