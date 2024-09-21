const mongoose = require('mongoose');
const env=require('./enviroment.js');
main().catch(err => console.log(err));

async function main() {
    console.log("mongoose has connected");
    
  await mongoose.connect(`mongodb+srv://${env.mongo_config.username}:${env.mongo_config.password}@spcluster0.l3k99.mongodb.net/?retryWrites=true&w=majority&appName=spcluster0`);
}