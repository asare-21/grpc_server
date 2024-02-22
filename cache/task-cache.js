require('dotenv').config();
const cacheHostName = process.env.AZURE_CACHE_FOR_REDIS_HOST_NAME;
const cachePassword = process.env.AZURE_CACHE_FOR_REDIS_ACCESS_KEY;
const redis = require('redis')

const redisClient = redis.createClient({
    url: `rediss://${cacheHostName}:6380`,
    password: cachePassword,
})

module.exports.getTaskParents = async (id, res, next) => {
    const taskParents = await redisClient.get(`taskParents/${id}`);
    if (taskParents) {
        // TODO: Change code and use gRPC to send the response
        return JSON.parse(taskParents);
    }
    next();
}

module.exports.getTasksByParentId = async (id, res, next) => {
    const tasks = await redisClient.get(`tasks/${id}`);
    if (tasks) {
        let result = JSON.parse(tasks).map((t) => t.childId);
        if (!result || !Array.isArray(result)) {
            next();
        } else {
            return result;
        }
    }
    next();
};