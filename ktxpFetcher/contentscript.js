(function(){
	var shift = false;
	var last_click = -1;
	var trs = $('div.item-box').find('tbody').children('tr');
	
	trs.each(function(i, e){
		var str = "link_" + i;
		var td = $('td:eq(1)', e);
		if (!td.is(':has(a.quick-down)'))
			td.empty().prepend('<input type="checkbox" class="link_class" id="' + str + '"/>');
	});
	
	var get_link_no = function(str){	
		return parseInt(str.substr('link_'.length));
	};
	
	$('input.link_class').live('click', function(){
		
		var pos = get_link_no(this.id);
		if (shift && last_click >= 0 && last_click != pos)
		{
			var start, end;
			if (last_click > pos)
			{
				start = pos;
				end = last_click - 1;
			}
			else
			{
				start = last_click + 1;
				end = pos;
			}
			
			var status = typeof($('#link_' + last_click).attr('checked')) != "undefined";
			
			
			for (var i = start; i <= end; i++)
				if (status)
					$('#link_' + i).attr('checked', 'checked');
				else
					$('#link_' + i).removeAttr('checked');
					
			last_click = pos;
			return true;
		}
		else
			last_click = pos;
	});
	
	var txt = $('<textarea />').attr('id', 'show_area')
		.css({
			'position': 'fixed',
			'top': '50px',
			'left': '5px',
			'z-index': '99999',
			'width': '140px',
			'height': '250px'
		})
		.appendTo('body');
	
	$(document).keydown(function(e){
		if (e.keyCode == 16)
			shift = true;
	});
	
	$(document).keyup(function(e){
		if (e.keyCode == 16)
			shift = false;
	});
	
	$('<button />').click(function(){
			var urls = '';

			$(':checked').each(function(){
				urls += 'http://bt.ktxp.com' + $(this).parent().parent().find('a.quick-down').attr('href') + ' ';
			});
			txt.text(urls);
			txt.get(0).focus();
			txt.get(0).select();
			
			chrome.extension.sendMessage({greeting: "hello"}, function(response) {
			  console.log(response.farewell);
			});
			return false;
		})
		.css({
			'position': 'fixed',
			'top': '10px',
			'left': '20px',
			'z-index': '9999'
		})
		.text('提取选中种子链接')
		.appendTo('body');
		
	$('body').children('a').remove();
	chrome.extension.sendRequest({}, function(response) {});
})();