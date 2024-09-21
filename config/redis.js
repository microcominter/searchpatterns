const  { createClient }  = require('redis');

const redisClient = createClient({
    password: 'DRbLEi8WvW2WzHwJQiGgUQvm8e36byDk',
    socket: {
        host: 'redis-17481.c81.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 17481
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
