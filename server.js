const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require("path");
const cron = require("node-cron");
const { spawn } = require('child_process');

// connect database
connectDB();

// Init Middleware
// @ts-ignore
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Bienvenido' }));
// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/cities', require('./routes/cities'));
app.use('/api/jobs', require('./routes/jobs'));

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

///// for live
app.use(express.static('admin/build'));

app.use('/uploads', express.static('admin/public/uploads'));

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'admin', 'build', 'index.html')));

const PORT = process.env.PORT || 3000;

// schedule tasks to be run on the server
cron.schedule("55 10 * * *", function () {
  console.log("running a task every day");
  const python = spawn('python', ['jobs.py']);
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));


