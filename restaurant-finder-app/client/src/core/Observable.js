import React from 'react';
import URLManager from './../utils/URLManager';
import RbUtil from './../utils/RbUtil.js';
import AjaxUtil from './../utils/AjaxUtil.js';

export default class Observable extends React.Component{

    constructor(props){
        super(props);
    }

    rb(rawTxt, txtArgs){
		return RbUtil.getText(rawTxt, txtArgs);
	}

    ajaxGet(url, data, success, failure){
		new AjaxUtil(url, data).get(success, failure);
	}

	ajaxPost(url, data, success, failure){
		new AjaxUtil(url, data).enableCORS().post(success, failure);
	}

	ajaxPut(url, data, success, failure){
		new AjaxUtil(url, data).enableCORS().put(success, failure);
	}

	get(url, data, success, failure){
		this.ajaxGet(url, data, success, failure);
	}

	post(url, data, success, failure){
		this.ajaxPost(url, data, success, failure);
	}

	put(url, data, success, failure){
		this.ajaxPut(url, data, success, failure);
    }
    
    urlFor(action){
		return URLManager.getUrlForAction(action);
	}

	render(){
		return(
			<>
			</>
		)
	}

}