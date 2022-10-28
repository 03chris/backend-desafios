const app = require('./app')

app.set('port', process.env.PORT || 8080)

app.listen(app.get('port'), ()=>{
    console.log('Server run')
})
