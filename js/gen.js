function debug(s) {
    if (typeof useDebug != 'undefined' && useDebug) console.debug(s);
}
var Gen = {
    result: $(".generator__result"),
    nik: function(r, lang) {
        var fref = {
            nickcount: 1,
            modelorder: {
                value: 1
            },
            charcount: {
                value: r
            },
            firstchar: {
                value: 'any'
            },
            resname: {
                value: ''
            }
        };
        genName(fref);
        return fref.resname.value;
    },
    password: function(len) {
        return this.nik(len, 'en');
    },
    number: function(min, max) {
        var rand = 0;
        rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    },
};
