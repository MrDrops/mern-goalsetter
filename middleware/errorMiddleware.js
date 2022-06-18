// All that middleware is are functions that execute during the ress-req cycle

// To overrride the default express error handler
const errorHandler = (err, req, res, next) => {
    // check if there is statuscode else set to 500 server error
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);

    res.json({
        message: err.message,
        //extra info about error in stack but only throw in dev mode
        stack: process.env.NODE_ENV !== 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}