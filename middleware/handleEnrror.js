module.exports = function(err, req, res, next) {
    console.log()
    if (err) {
        return res.json({ 'MessageError': err.message }).status(400);
    }
}