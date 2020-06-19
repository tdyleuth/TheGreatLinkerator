const express = require('express');
const linksRouter = express.Router();

const { requireUser } = require('./utils');

const { getAllLinks, createLink, getLinkById, updateLink } = require('../db')

linksRouter.use( (req,res,next) => {
    console.log("A request is being made to /links")

    next();
});

//Get all links

linksRouter.get('/', async (req,res) => {
    const links = await getAllLinks();

    res.send({
        links
    });
});

//Create new link
linksRouter.post('/',requireUser, async (req,res,next) => {
    const { name, url, comment } = req.body;
    const { id } = req.user;

    try{
        const link = await createLink({
            creatorId: id,
            name,
            url,
            comment,
        })

        if(link){
            res.send({
                message:"New link created!",
                link
            });
        } else {
            next({
                name:'NoLinkRetrievedError',
                message: 'No Link Retrieved!'
            })
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
})

//Update Link

linksRouter.patch('/:linkId',requireUser, async (req, res, next) => {
    const { linkId } = req.params;
    const { name, url, comment } = req.body;
    const { id } = req.user;
    
    const updateFields = {};

    if(name) {
      updateFields.name = name;
    }
  
    if(url){
      updateFields.url = url;
    }

    if(public){
        updateFields.comment = comment
    }


    try {
      const originalLink = await getLinkById(linkId);
      const _creatorID = originalLink.creatorId;
  
      if(id === _creatorID){
        const updatedLink = await updateLink(linkId, updateFields);

        res.send({
          message:"Link has been updated",
          link: updatedLink
        });

      } else{
        next({
        name: 'UnauthorizedUserError',
        message: 'You do not have permission to update Link'
      })
    }
  }
    catch ({ name, message }) {
  
      next({ name, message });
    }     
  });

  


module.exports = linksRouter;