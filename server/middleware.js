const jwt = require('jsonwebtoken');

function AppendCookie(req, res, next) {
                                                        //use an environment variable here
    const token = jwt.sign({email: "Phllpbll@fuck.com"}, 'insertabetterkeyhere');
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: "production",
    }).status(200)

    next();
}

module.exports = {
        appendCookie: AppendCookie
    }
