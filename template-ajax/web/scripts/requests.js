const GetXmlHttpRequest = () => {
	try { 
		return new XMLHttpRequest(); 
	} catch (_) { }
	
	const activeXoptions = new Array( "Microsoft.XmlHttp", "MSXML4.XmlHttp", "MSXML3.XmlHttp", "MSXML2.XmlHttp", "MSXML.XmlHttp" );

	for (let i = 0 ; i < activeXoptions.length && !created ; i++) {
		try {
			return new ActiveXObject( activeXoptions[i] );
		}  catch (_) { } 
	}
};

const request = (type, url, onSend, onReceive, onContentLoaded, onError) => {
	const xhr = GetXmlHttpRequest();
	if (!xhr)
		return;
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 2) {
			onSend && onSend();
		} 
		else if (xhr.readyState === 3) {
			onReceive && onReceive();
		} 
		else if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				onContentLoaded && onContentLoaded(xhr.responseText);
			} 
			else {
				onError && onError(xhr.statusText);
			} 
		}
	}

	try {
		xhr.open(type, url, true);
		//xhr.setRequestHeader("connection", "close");
		xhr.send(null);
	}
	catch(e) {
		onError && onError(e);
	}
	
}