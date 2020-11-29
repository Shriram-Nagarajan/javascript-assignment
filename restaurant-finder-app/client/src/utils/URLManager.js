const baseDomain = {};
const urlConfig = {};

Object.assign(baseDomain,window.base_urls);
Object.assign(urlConfig,window.app_urls);


window.app_urls = null;
window.base_urls = null;

/*
* COmmon file to manage URLs
*/
const URLManager = function(){
    var actionUrlMap = urlConfig || {};	

    const PROTOCOL = window.location.protocol + "//";

    let sortedBaseDomain = {};
    if(baseDomain){
        let sortedArr = Object.keys(baseDomain).sort((a,b) => b.length - a.length);
        if(sortedArr && sortedArr.length > 0){
            for(let i=0; i < sortedArr.length; i++){
                sortedBaseDomain[sortedArr[i]] = baseDomain[sortedArr[i]];
            }
        }
    }

    const replaceBaseUrl=function(url){
        if(sortedBaseDomain){
            for(let i in sortedBaseDomain){
                if(url && ~url.indexOf(i)){
                    url = url.replace(i, sortedBaseDomain[i]);
                    if(url && !url.match("http[s]?://+")){
                        url = PROTOCOL + url;
                    }
                    return url;
                }
            }
        }
        return url;
    }

    return{
        getUrlForAction:function(action){
            if(typeof actionUrlMap[action] === "string"){
                return replaceBaseUrl(actionUrlMap[action]);
            }else{
                return "#";
            }
        }
    }
}();

export default URLManager;