"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const mongo_1 = require("./config/mongo");
const routes_1 = __importDefault(require("./routes/routes"));
const connect_redis_1 = require("connect-redis");
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
dotenv_1.default.config();
const app = (0, express_1.default)();
let redisClient = (0, redis_1.createClient)();
redisClient.connect().catch(console.error);
app.use((0, express_session_1.default)({
    store: new connect_redis_1.RedisStore({
        client: redisClient,
        prefix: 'sess:',
    }),
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    },
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use('/api', routes_1.default);
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
(async () => {
    try {
        await (0, mongo_1.connectMongoDB)();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
})();
