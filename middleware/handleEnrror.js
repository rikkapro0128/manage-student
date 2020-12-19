module.exports = new class handle {
    requestAll(err, req, res, next) {
        if (err) {
            return res.json({ 'MessageError': err.message }).status(400);
        }
    }
    
    requestSign(err) {
        if(err.code == 11000) 
        {
            err.message = 'That User is already registered!';
        }
        return err;
    }
}
