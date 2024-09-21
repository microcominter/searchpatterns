const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const MongoStore=require('connect-mongo');
// const axios = require('axios');
const Groq = require('groq-sdk');
const db=require('./config/db');
const logger=require('morgan');
const env = require('./config/enviroment');
require('dotenv').config();
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

app.use(cors({origin:'http://localhost:5173',
    credentials:true,
    optionsSuccessStatus:204,
}));
app.use(express.json());
app.use(logger(env.morgan.mode,env.morgan.options));
app.use(session({
    name:'searchpatterns',
    // todo change the secret before deployment in production mode
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    store: MongoStore.create(
        {
            mongoUrl: `mongodb+srv://${env.mongo_config.username}:${env.mongo_config.password}@spcluster0.l3k99.mongodb.net/?retryWrites=true&w=majority&appName=spcluster0`,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}
));
app.use(ClerkExpressWithAuth());
app.use('/',require('./routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
