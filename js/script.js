function GenBrand () 
{
	var cnt = $("#slider-val").val();
	var arr = new Array();
	if ((cnt=='') || (cnt==undefined)) cnt=2;

	$(".base:checked").each(function (i) 
	{
       arr.push($(this).attr("id"));
    });
	$.get( "ajax.php", {"action":"get_brand", "base":arr, "cnt": cnt})
    .done(function( data ) 
    {
    	$("#main").css('font-size', '40px');
    	$("#main").html(data);
    });
}

function GenSlogan () 
{
	var text = $("#slog").val();
	var type = $("#type").val();
	if (text.length<1) return;
	$.get( "ajax.php", {"action":"get_slogan", "text":text, "type": type})
    .done(function( data ) 
    {
    	//alert(data);
    	$("#main").css('font-size', '40px');
    	$("#main").text(data);
    });
}

function RandOf (min,max) 
{
	var rand = 0;
	rand = min - 0.5 + Math.random()*(max - min+1);
	rand = Math.round(rand);
	return rand;
}


function GenRandOf (argument) 
{
	var count = $("#sk").val();
	var max = $("#iz").val();
	var comb = $("#comb").val();
	var arr = new Array();
	for (var i = 1; i <= comb; i++) 
	{
		arr[i] = '';
		for (var j = 1; j <= count; j++) 
		{
			arr[i] = RandOf(1,max) + ', '+ arr[i];
			if (j==count) arr[i] = arr[i].substr(0,arr[i].length-2);
		}
	}
	$("#main").html("");
	$("#main").css("font-size", "32px");
	for (var i = 1; i <= comb; i++) 
	{
		$("#main").append(arr[i]+"<br>");
	}
}



function GenRand() 
{
	var min = $('#min').val(); 
	var max = $('#max').val(); 	
	var rand = 0;
	var cnt = $('#slider-val').val();
	var str2 = '';
	if ((cnt=='') || (cnt==undefined)) cnt=1;
	$("#main").text('');

	for (var i = 1; i <= cnt; i++) 
	{

		rand = min - 0.5 + Math.random()*(max - min+1);
		rand = Math.round(rand);
		str2 = str2 + rand+br_;
		$("#main").append(rand+ '<br>');
	};
	$("#main").css('font-size', Math.round(75-cnt*4)+'px');
	$('#copy-button').attr('data-clipboard-text', str2);
}



function rnda(x,y,z) { 
	var num;
	do {
		num = parseInt(Math.random()*z);
		if (num >= x && num <= y) break;
	} while (true);
return num;
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
function genArray() {	
	if ($("#upper").is(':checked') || $("#lower").is(':checked') || $("#num").is(':checked') || $("#symbol").is(':checked'))
	{
		// массивы символов
		upp = new Array('','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
		low = new Array('','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
		dig = new Array('','0','1','2','3','4','5','6','7','8','9');
		spec = new Array('','!','@','#','$','%','^','&','*','(',')');
		var pwd = '';
		var res, s;
		var k = 0;
		var cnt = $('#slider-val').val();
		if ((cnt=='') || (cnt==undefined)) cnt=1;
		var n = cnt;
		var pass = new Array();
		var w = rnda(30,80,100);
		for (var r = 0; r < w; r++) 
		{
			if ($("#upper").is(':checked')) { res = rnda(1,26,100); pass[k] = upp[res]; k++; }
			if ($("#lower").is(':checked')) { res = rnda(1,26,100); pass[k] = low[res]; k++; }
			if ($("#num").is(':checked')) { res = rnda(1,10,100); pass[k] = dig[res]; k++; }
			if ($("#symbol").is(':checked')) { res = rnda(1,10,100); pass[k] = spec[res]; k++; }
		}
		for (var i = 0; i < n; i++) 
		{
			s = rnda(1,k-1,100);
			pwd+= pass[s];
		}
		return pwd;
	}
}



