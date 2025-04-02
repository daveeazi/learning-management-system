import redis from 'redis';

// Create Redis client
const client = redis.createClient();

export const cacheMiddleware = (req, res, next) => {
  const { id } = req.params;
  
  // Check if cache exists for the requested data
  client.get(id, (err, data) => {
    if (data) {
      return res.json(JSON.parse(data)); // Return cached data
    }
    next(); // Proceed to fetch data from DB
  });
};

export const setCache = (id, data) => {
  client.setex(id, 3600, JSON.stringify(data)); // Cache data for 1 hour
};
