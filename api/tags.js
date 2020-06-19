const express = require('express');
const tagsRouter = express.Router();

const { requireUser } = require('./utils');

const { getAllTags } = require('../db')

tagsRouter.use( (req,res,next) => {
    console.log("A request is being made to /tags")

    next();
});

//Get all links

tagsRouter.get('/', async (req,res) => {
    const tags = await getAllTags();

    res.send({
        tags
    });
});

module.exports = tagsRouter;