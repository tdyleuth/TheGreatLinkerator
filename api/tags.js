const express = require('express');
const tagsRouter = express.Router();

const { requireUser } = require('./utils');

const { getAllTags, getLinkByTagName } = require('../db');
const linksRouter = require('./links');

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


//Get links by tagName

tagsRouter.get('/:tagName/links', async (req, res, next) => {
    const { tagName } = req.params;
  
    const links = await getLinkByTagName(tagName);
    
    try {
        if(links) {
            res.send({
                links
            });
        } else {
            next({
                name: 'NoLinksForTagsrror',
                message: "Did not find any links for this tag"
            });
        }
    } catch({ name, message }) {
        next({ name, message });
    }
  });
  


module.exports = tagsRouter;