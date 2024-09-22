const  { createClient }  = require('redis');

const redisClient = createClient({
    password: `${process.env.REDIS_PASSWORD}`,
    socket: {
        host: `${process.env.REDIS_HOST}`,
        port: `${process.env.REDIS_PORT}`
    }
});

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Redis connection error:', error);
  }
})();

redisClient.on('error', (err) => console.log('Redis Client Error', err));

module.exports = redisClient;
