

module.exports = function(hbs) {

    hbs.registerHelper('hideSign', function() {

        return isHide ? true : false;
    });

}
