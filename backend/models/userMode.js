const mongoose = require('mongoose');   
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://admin:admin@cluster4.itbmot8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster4', { useNewUrlParser: true })
.then(() => {
    console.log('Database connection successful')
});
// Define collection and schema for User
let User = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
    email: {
        type: String
    },
},{
    collection: 'users'
});

module.exports = mongoose.model('User', User);
