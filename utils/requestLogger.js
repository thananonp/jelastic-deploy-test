const requestLogger = (request, response, next) => {
    console.log('==start Logger==')
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('==end Logger==')

    next()
}

module.exports = requestLogger