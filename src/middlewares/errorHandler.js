let errorHandler = (err,_req,res,_next) => {
    console.log(err)
    res.status(500).json({
        response: 'error',
        err: err.message
    })
}

module.exports = errorHandler