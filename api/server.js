const express = require('express');
const projectsRouter = require('./projects/projects-router')
const server = express();

server.use('/api/projects', projectsRouter)


module.exports = server;
