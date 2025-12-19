const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const response = require('./utils/response');

// Load Swagger Document
const swaggerDocument = YAML.load(path.join(__dirname, './config/swagger.yaml'));

// Route files
const authRoutes = require('./modules/auth/auth.route');
const userRoutes = require('./modules/users/user.route');
const departmentRoutes = require('./modules/departments/department.route');
const assetRoutes = require('./modules/assets/asset.route');
const activityRoutes = require('./modules/activities/activity.route');

const app = express();

// Middlewares
app.use(express.json());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Set static folder
app.use(express.static(path.join(__dirname, '../public')));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/activities', activityRoutes);

app.get('/', (req, res) => {
    response(res, 200, true, 'Welcome to Smart Management System API');
});

// 404 handler
app.use((req, res) => {
    response(res, 404, false, 'Route not found');
});

module.exports = app;
