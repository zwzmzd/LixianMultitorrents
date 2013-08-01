(function(){
	
	var urls = [];
	var now = -1;
	var success = 0;
	var skip = 0;
	
	var bg = $('<div />')
		.css({
			'position': 'absolute',
			'top': '5px',
			'left': '420px',
			'z-index': '10000',
			'background-color': 'white',
			'padding': '10px',
			'border-radius': '10px'
		})
		.appendTo('body');
	
	var txt = $('<input />').attr('id', 'show_area')
		.css({
			'z-index': '99999',
			'width': '500px'
		})
		.prependTo(bg);
		
	var update_info = function(){
		if (success + skip == urls.length)  document.title = 'All Complete';
		else document.title = success + ',' + skip +'/' + urls.length + ' Complete';
		
		first_line.text('成功' + success + '个, 跳过' + skip + '个, 总共: ' + urls.length + '个');
		second_line.text('第' + (now + 1) + '个任务完成');
	};
		
	var jsonp123456789 = function(status){
		if (status['id'] != null && status['progress'] == 1)
			success += 1;
		
		update_info();
	};
	
	var on_task_skip = function(){
		skip++;
		
		update_info();
	};

	var yield = function(array){
		st = '';

		for (var v in array)
			st += array[v] + '_';
			
		return st;
	};
	
	var let_next_be = function(){
		if (++now < urls.length)
			commit(urls[now]);
	};
	
		
	var queryUrl = function(){
		var a = arguments;
		
		if (a[0].toString().indexOf('-1') != -1)
		{
			on_task_skip();
			setTimeout(let_next_be, 2000);
			return;
		}

		var param = {
			'uid': $.getCookie('lx_login'),
			'btname': a[3],
			'cid': a[1],
			'goldbean': '0',
			'silverbean': '0',
			'tsize': a[2],
			'findex': yield(a[a.length - 3]),
			'size': yield(a[a.length - 6]),
			'o_taskid': '0',
			'o_page': 'task',
			'class_id': '0',
			'interfrom': 'task'
		}
		
		st = ''
		for (var e in param)
			st += e + ': ' + param[e] + '\n';
		
		url = '/interface/bt_task_commit?callback=jsonp123456789&t=' + encodeURIComponent(new Date());
		$.post(url, param, function(data){
			eval(data);
			setTimeout(let_next_be, 2000);
		});
	}
	
	var commit = function(url){
		second_line.text('正在执行第' + (now + 1) + '个任务: ' + url);
		
		var param = {
			'callback': 'queryUrl',
			'u': url,
			'interfrom': 'task',
			'random': new Date().getTime().toString()+(Math.random()*(2000000-10)+10).toString(),
			'tcache': new Date().getTime().toString()
		};
		$.get('/interface/url_query', param, function(data){
			eval(data);	
		});
	};
	
	$('<br />').prependTo(bg);
	
	var hello = function(){
		alert('hello');
	};
	
	$('<button />').click(function(){
			content = txt.val()
			urls = content.trim().split(' ');
			now = -1;
			success = 0;
			skip = 0;
			
			first_line.text('一共' + urls.length + '个任务');
			document.title = 'Starting...';
			let_next_be();
			
			return false;
		})
		.css({
			'z-index': '9999',
			'margin': '10px'
		})
		.text('提交到离线')
		.prependTo(bg);
		
	var first_line = $('<p />').text('请添加BT种子链接，以空格作为分隔符').appendTo(bg);
	var second_line = $('<p />').text('网络有延迟，请小心').appendTo(bg);
	
	chrome.extension.sendRequest({}, function(response) {});
})();