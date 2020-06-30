const express = require('express');
const linksRouter = express.Router();

const { requireUser } = require('./utils');

const { getAllLinks, createLink, getLinkByLinkId, updateLink, destroyLinkTags, destroyLink, updateTag, createTags, addTagsToLink, getLinkByUserId } = require('../db')

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


//Get links by userId
linksRouter.get('/user', requireUser, async (req, res) => {
  const { id } = req.user
  const links = await getLinkByUserId(id);

  res.send({
    name: "LinkSuccess",
    message: "Links retrieved!",
    links
  });

})


//Create new link with added tags
linksRouter.post('/',requireUser, async (req,res,next) => {
    const { name, url, comment="", tags = "" } = req.body;
    const { id } = req.user;
    
    const linkData = {};
    
    if(tags.length) {
  
      linkData.tags = tags;
    }
  
 
    try{
      const creatorId = id;
      linkData.creatorId = creatorId;
      linkData.name = name;
      linkData.url  = url;
      linkData.comment = comment;
      linkData.clicks = 0;
      linkData.dateCreated = new Date(Date.now());
      linkData.dateModified = new Date(Date.now());
      linkData.lastAccessed = new Date(Date.now());
      
      const link= await createLink(linkData);

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
});


//Update Link

linksRouter.patch('/:linkId',requireUser, async (req, res, next) => {
    const { linkId } = req.params;
    // @ts-ignore
    const { id } = req.user;
    const { name, url, clicks, comment, tags, dateModified, lastAccessed } = req.body;
    const tagsArr = tags.trim().split(/\s+/)

    
    const updateFields = {};

  
    if(name) {
      updateFields.name = name;
    }
  
    if(url){
      updateFields.url = url;
    }

    if(clicks){
      updateFields.clicks = clicks;
  }

    if(comment){
        updateFields.comment = comment;
    }

    if(dateModified){
        updateFields.dateModified = dateModified;
    }

    if(lastAccessed){
        updateFields.lastAccessed = lastAccessed;
    }

  
    try {
      const originalLink = await getLinkByLinkId(linkId);
      const _creatorID = originalLink.creatorId;
  
      if(id === _creatorID){
        await updateLink(linkId, updateFields);

        const updatedTags = await createTags(tagsArr)

        await addTagsToLink(linkId, updatedTags);

        const updatedLink = await getLinkByLinkId(linkId)

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



//Delete link and link_tags related
linksRouter.delete('/:linkId', requireUser, async (req, res, next) => {
  const { linkId } = req.params;
  console.log(linkId)
  const { id } = req.user;
  try{
      const link = await getLinkByLinkId(linkId);
      console.log(link)

      if(link && link.creatorId === id) {
      
      const deletedLinkTags = await destroyLinkTags(linkId);
      const deletedLink = await destroyLink(linkId);
      

      res.send({ 
          message: "Link Deleted",
          deleletedLink: deletedLink,
          deletedLinkTags: deletedLinkTags
      });
      } else {
          next(link 
          ? {
              name:"UnauthorizedUserError",
              message: "You cannot delete a link which is not yours"
          }
          : {
            name: "LinknotFoundError",
            message: "Link does not exist"
          });
       }

  } catch ({name, message }){
    next({ name, message })
  }
});




module.exports = linksRouter;