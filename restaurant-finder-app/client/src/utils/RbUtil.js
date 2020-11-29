const en_IN = window.en_in;
delete window.en_in;

const RbUtil = function(){

	//Setting defaultLocale to en_IN
	var defaultLocale = "en_IN";

	//Setting userLocale to en_IN unless otherwise changed by the user
	var userLocale = "en_IN";

	var getBundle = function(locale){
		switch(locale){
			case "en_IN" : return en_IN;
			default: return en_IN;
		}
	}
	var replaceDynamicText = function(originalString,replaceStringArray)
	{
		for(var i=0;i<replaceStringArray.length;i++)
		{
		   var val = "{"+i+"}";
		   originalString = originalString.split(val).join(replaceStringArray[i]);
		}
		return originalString;
	}
	return {
		getText:function(rawTxt,replaceStringArray=[]){
			try{
				var rb = getBundle(userLocale);
				if(rb[rawTxt]){
					return (replaceStringArray.length > 0) ? replaceDynamicText(rb[rawTxt],replaceStringArray) : rb[rawTxt];
				}
				else if(getBundle(defaultLocale)[rawTxt]){
					return (replaceStringArray.length > 0) ? replaceDynamicText(getBundle(defaultLocale)[rawTxt],replaceStringArray) : getBundle(defaultLocale)[rawTxt];
				}
			}catch(e){
				console.error(e);
			}
			return (replaceStringArray.length > 0) ? replaceDynamicText(rawTxt,replaceStringArray) : rawTxt;
		},
		setLocale:function(locale){
			userLocale = locale;
		},
		getLocale:function(){
			return userLocale;
		}
	}
}();

export default RbUtil;