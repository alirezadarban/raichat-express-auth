"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
exports.redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL,
});
exports.redisClient.on('connect', () => {
    console.log('Redis connected');
});
exports.redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});
const connectRedis = async () => {
    try {
        await exports.redisClient.connect();
    }
    catch (error) {
        console.error('Error connecting to Redis:', error);
        throw error;
    }
};
exports.connectRedis = connectRedis;
