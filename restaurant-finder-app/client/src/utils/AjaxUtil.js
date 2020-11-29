/**
* Ajax core enables CORS requests.
*/
const AjaxUtil = function(url,data){
	const availableMethods = ['GET','POST','PUT'];
	let paramStr = "";
	let withCredentials = false;
	let defaultHeaders = {
		"Content-type": "application/json;charset=UTF-8",
		'Accept':  '*'  
	};

	let reqBodyTypePreference = "string";
	
	
	const processHeaders = function(request){
		if(defaultHeaders && typeof defaultHeaders === "object"){
			for(var i in defaultHeaders){
				request.setRequestHeader(i,defaultHeaders[i]);
			}
		}

		request.withCredentials = withCredentials;

		if(request.withCredentials){
			request.crossDomain = true;
			request.setRequestHeader("withCredentials", true);
			request.setRequestHeader("crossDomain", true);
		}

		return request;
	}

	//To enable CORS request
	this.enableCORS = function(){
		withCredentials = true;

		return this;
	}

	this.setFormData = function(formObj){
		reqBodyTypePreference = "object";
		var formData = new FormData();
		if(formObj){
			for(var i in formObj){
				formData.append(i, formObj[i]);
			}
		}

		defaultHeaders = {};

		data = formData;		
		return this;
	}

	this.setHeaders = function(headers){
		if(headers && typeof headers === "object"){
			for(var i in headers){
				defaultHeaders[i] = headers[i];
			}
		}

		return this;
	}
	
	this.preferObject = function(type){
		if(type)
		reqBodyTypePreference = type;
		
		return this;
	}

	if(data != null){
		paramStr = "?";
		var tempIndex = 0;
		for(var i in data){
			if( tempIndex > 0){
				paramStr += "&";  
			}
			paramStr += i + "=" + data[i];
			tempIndex ++;
		}
	}

	this.get = function(success, failure){
	  this.connect('GET',success, failure);
	}

	this.post = function(success, failure){
		this.connect('POST',success, failure);
	}

	this.put = function(success, failure){
		this.connect('PUT',success, failure);	
	}

	this.connect = function(method, success, failure){
		if(availableMethods.indexOf(method) === -1){
			//if method not defined, default is applied
			method = availableMethods[0];
		}

		// Feature detection
		if ( !window.XMLHttpRequest ) return;
		// Create new request
		var request = new XMLHttpRequest();
		//enable CORS
		request.withCredentials = withCredentials;

		request.onreadystatechange = function () {
			// If the request is complete
			if ( request.readyState === 4 ) {
				// If the request failed
				if ( request.status !== 200 ) {
					if ( failure && typeof failure === 'function' ) {
						var failResp = {};						
						try{
							 failResp = JSON.parse(request.responseText);
						}catch(e){
							failResp = request.responseText;
						}

						failure( failResp, request );	
					}
					return;
				}
				// If the request succeeded
				if ( success && typeof success === 'function' ) {
					 var successResp = {};
					try{
						 successResp = JSON.parse(request.responseText);
					}catch(e){
						successResp = request.responseText;
						//console.error(e);
					}

					success( successResp, request );
				}

				return;
			}
		};
		
		if(paramStr != null){
			if(method === 'GET'){
				url += paramStr; 
				request.open( method , url, true);
				request.send();
			}else{
				request.open( method , url, true);
				request = processHeaders(request);
				if(reqBodyTypePreference === "object"){
					request.send(data);
				}else{
					request.send(JSON.stringify(data));
				}
					
			}
		}else{
			console.error("No Params to request to Host machine.");
		}
				
	}
}


export default AjaxUtil;