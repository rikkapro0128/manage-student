module.exports = function(hbs) {

    hbs.registerHelper('gender', function(type, value) {
        if(type === value) { 
            return 'selected';
        }
    });

}
