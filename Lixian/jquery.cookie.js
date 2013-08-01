(function($){
	$.getCookie=function(name){
		name=name.replace(/\-/,"\\-");
		var regex=new RegExp(name+"\\=[^;]*");
		//name=value
		var str=document.cookie.match(regex);
		if (!str) return null;
		str=str.toString();
		//=value
		str=str.match(/=[^;]*/).toString();
		return str.substring(1);
	}
	$.setCookie=function(name,value,expires)
	{
		var str=name+'='+value;
		if (typeof expires!='undefined')
		{
			var today=new Date();
			var exp=new Date();
			//while expires==false set expires the ms a year have
			if (expires==false) expires=1000*60*60*24*10;
			else expires=parseInt(expires);
			exp.setTime(today.getTime()+expires);
			str+=";expires="+exp.toGMTString();
		}
		document.cookie=str;
	}
	$.delCookie=function(name)
	{
		$.setCookie(name,'del',-1);
	}
}(jQuery));