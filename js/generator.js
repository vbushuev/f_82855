function alphalow(index) { return String.fromCharCode(97 + index); }
function alphaup(index) { return String.fromCharCode(65 + index); }
function rnd(ceiling) { return Math.floor(Math.random() * ceiling); }

function genName(lang) {
    var order = 1;
    if (lang=='ru') 
    	var namelen = $("#charcount2").val();
    if (lang=='en')
		var namelen = $("#charcount").val();

	namelen = namelen == "any" ? namelen = order + 2 + rnd(7) : + namelen;
	if (lang=='ru') 
		var curchar = $("#firstchar2").val();
	if (lang=='en') 
		var curchar = $("#firstchar").val();	
	curchar = curchar == "any" ? rnd(26) : + curchar;

	var nam = alphaup(curchar);

	var ran, curar, firstchar, secondchar, thirdchar, nextchar;
	
			firstchar = curchar;

			for (var cnt = 1; cnt < namelen; cnt++) {
				ran = rnd(1000);
				nextchar = 0;
				curar = letters[firstchar];
				while (ran >= curar[nextchar]) nextchar++;

				firstchar = nextchar;
				nam += alphalow(nextchar);
			}

	if (lang=='ru')
	{
		nam = nam.replace(/A/g,"А"); nam = nam.replace(/a/g,"а");
		nam = nam.replace(/B/g,"Б"); nam = nam.replace(/b/g,"б");
		nam = nam.replace(/C/g,"Ц"); nam = nam.replace(/c/g,"ц");
		nam = nam.replace(/D/g,"Д"); nam = nam.replace(/d/g,"д");
		nam = nam.replace(/E/g,"Е"); nam = nam.replace(/e/g,"е");
		nam = nam.replace(/F/g,"Ф"); nam = nam.replace(/f/g,"ф");
		nam = nam.replace(/G/g,"Г"); nam = nam.replace(/g/g,"г");
		nam = nam.replace(/H/g,"Х"); nam = nam.replace(/h/g,"х");
		nam = nam.replace(/I/g,"И"); nam = nam.replace(/i/g,"и");
		nam = nam.replace(/J/g,"Ж"); nam = nam.replace(/j/g,"ж");
		nam = nam.replace(/K/g,"К"); nam = nam.replace(/k/g,"к");
		nam = nam.replace(/L/g,"Л"); nam = nam.replace(/l/g,"л");
		nam = nam.replace(/M/g,"М"); nam = nam.replace(/m/g,"м");
		nam = nam.replace(/N/g,"Н"); nam = nam.replace(/n/g,"н");
		nam = nam.replace(/O/g,"О"); nam = nam.replace(/o/g,"о");
		nam = nam.replace(/P/g,"П"); nam = nam.replace(/p/g,"п");
		nam = nam.replace(/Q/g,"К"); nam = nam.replace(/q/g,"к");
		nam = nam.replace(/R/g,"Р"); nam = nam.replace(/r/g,"р");
		nam = nam.replace(/S/g,"С"); nam = nam.replace(/s/g,"с");
		nam = nam.replace(/T/g,"Т"); nam = nam.replace(/t/g,"т");
		nam = nam.replace(/U/g,"У"); nam = nam.replace(/u/g,"у");
		nam = nam.replace(/V/g,"В"); nam = nam.replace(/v/g,"в");
		nam = nam.replace(/W/g,"Ч"); nam = nam.replace(/w/g,"ч");
		nam = nam.replace(/X/g,"Ш"); nam = nam.replace(/x/g,"ш");
		nam = nam.replace(/Y/g,"Й"); nam = nam.replace(/y/g,"й");
		nam = nam.replace(/Z/g,"З"); nam = nam.replace(/z/g,"з");
		var fs = $("#firstchar2 option:selected").text();
		nam = fs + nam.slice(1);
	}
	return nam;

}


function firstSel() {
	document.write('<select id="firstchar">');
	document.write('<option value="0">A</option>');
	for (var i = 1; i < 26; i++) {
		document.write('<option value="' + i + '">' + alphaup(i) + '</option>');
	}
	document.write('</select>');
}

function firstSel2() {
	document.write('<select id="firstchar2">');
	document.write('<option value="0">А</option>');
	document.write('<option value="1">Б</option>');
	document.write('<option value="21">В</option>');
	document.write('<option value="6">Г</option>');
	document.write('<option value="3">Д</option>');
	document.write('<option value="4">Е</option>');
	document.write('<option value="4">Ё</option>');
	document.write('<option value="9">Ж</option>');
	document.write('<option value="25">З</option>');
	document.write('<option value="8">И</option>');
	document.write('<option value="24">Й</option>');
	document.write('<option value="10">К</option>');
	document.write('<option value="11">Л</option>');
	document.write('<option value="12">М</option>');
	document.write('<option value="13">Н</option>');
	document.write('<option value="14">О</option>');
	document.write('<option value="15">П</option>');
	document.write('<option value="17">Р</option>');
	document.write('<option value="18">С</option>');
	document.write('<option value="19">Т</option>');
	document.write('<option value="20">У</option>');
	document.write('<option value="5">Ф</option>');
	document.write('<option value="7">Х</option>');
	document.write('<option value="2">Ц</option>');
	document.write('<option value="22">Ч</option>'); // W
	document.write('<option value="23">Ш</option>'); // X
	document.write('<option value="16">Щ</option>'); // Q
	document.write('<option value="4">Э</option>'); // E
	document.write('<option value="24">Ю</option>'); // Y
	document.write('<option value="4">Я</option>'); // 
	document.write('</select>');
}

function countSel() 
{
	document.write('<select id="charcount">');
	document.write('<option value="3">3</option>');
	for (var i = 4; i < 16; i++) {
		document.write('<option value="' + i + '">' + i + '</option>');
	}
	document.write('</select>');
}


function countSel2() 
{
	document.write('<select id="charcount2">');
	document.write('<option value="3">3</option>');
	for (var i = 4; i < 16; i++) {
		document.write('<option value="' + i + '">' + i + '</option>');
	}
	document.write('</select>');
}