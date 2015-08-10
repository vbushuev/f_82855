function alphalow(index) {
    return String.fromCharCode(97 + index);
}

function alphaup(index) {
    return String.fromCharCode(65 + index);
}

function rnd(ceiling) {
    return Math.floor(Math.random() * ceiling);
}

function genName(fref) {
    var retname = "";
    for ($i = 0; $i < fref.nickcount.value; $i++) {
        var nam = "";
        var order = +fref.modelorder.value;
        var namelen = fref.charcount.value;
        namelen = namelen == "any" ? namelen = order + 2 + rnd(7) : +namelen;
        var curchar = fref.firstchar.value;
        curchar = curchar == "any" ? rnd(26) : +curchar;
        var nam = alphaup(curchar);
        var ran, curar, firstchar, secondchar, thirdchar, nextchar;
        switch (order) {
            case 1:
                firstchar = curchar;
                for (var cnt = 1; cnt < namelen; cnt++) {
                    ran = rnd(1000);
                    nextchar = 0;
                    curar = letters[firstchar];
                    while (ran >= curar[nextchar]) nextchar++;
                    firstchar = nextchar;
                    nam += alphalow(nextchar);
                }
                break;
            case 2:
                firstchar = curchar;
                ran = rnd(1000);
                secondchar = 0;
                curar = letters[firstchar];
                while (ran >= curar[secondchar]) secondchar++;
                nam += alphalow(secondchar);
                for (var cnt = 2; cnt < namelen; cnt++) {
                    ran = rnd(1000);
                    nextchar = 0;
                    curar = letters2[firstchar][secondchar];
                    while (ran >= curar[nextchar]) nextchar++;
                    firstchar = secondchar;
                    secondchar = nextchar;
                    nam += alphalow(nextchar);
                }
                break;
            case 3:
                firstchar = curchar;
                ran = rnd(1000);
                secondchar = 0;
                curar = letters[firstchar];
                while (ran >= curar[secondchar]) secondchar++;
                nam += alphalow(secondchar);
                ran = rnd(1000);
                thirdchar = 0;
                curar = letters2[firstchar][secondchar];
                while (ran >= curar[thirdchar]) thirdchar++;
                nam += alphalow(thirdchar);
                for (var cnt = 3; cnt < namelen; cnt++) {
                    ran = rnd(1000);
                    nextchar = 0;
                    curar = letters3[firstchar][secondchar][thirdchar];
                    while (ran >= curar[nextchar]) nextchar++;
                    firstchar = secondchar;
                    secondchar = thirdchar;
                    thirdchar = nextchar;
                    nam += alphalow(nextchar);
                }
                break;
        }
        retname += nam + "\r\n";
    }
    debug(retname);
    fref.resname.value = retname;
}

function firstSel() {
    document.write('<select name="firstchar">');
    document.write('<option value="any">Любая</option>');
    for (var i = 0; i < 26; i++) {
        document.write('<option value="' + i + '">' + alphaup(i) + '</option>');
    }
    document.write('</select>');
}

function countSel() {
    document.write('<select name="charcount">');
    document.write('<option value="any">3-15</option>');
    for (var i = 3; i < 16; i++) {
        document.write('<option value="' + i + '">' + i + '</option>');
    }
    document.write('</select>');
}
