const {connect, connection} = require('mongoose');
const connectionURIString = 'mongodb://127.0.0.1:27017/socialNetworkDB'
   
connect(connectionURIString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


module.exports= connection;