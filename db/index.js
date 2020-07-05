const { Client } = require('pg');

const client = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/linkerator');

//User helper functions

async function createUser({
    username,
    password,
    name

  }) {
      try {
          const { rows: [ users ] } = await client.query(
              `INSERT INTO users(username, password, name)
               VALUES($1,$2,$3)
               ON CONFLICT (username) DO NOTHING
               RETURNING *;
               `, [username, password, name]);
  
               return users;
          
      } catch (error) {
          throw error;
        }
   }


   async function getUserById(userId) {
    try {
      const { rows: [ user ] } = await client.query(`
        SELECT *
        FROM users
        WHERE id=${ userId }
      `);
  
      if (!user) {
        return null
      }

  
      return user;
    } catch (error) {
      throw error;
    }
  }
  


async function getUserByUsername(username) {

    try {
      const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1
      `, [username]);
  
      return user;
    } catch (error) {
      throw error;
    }
  }

async function getAllUsers() {
   
  try {
    const { rows } = await client.query(`
       SELECT *
       FROM users;
    `);

    return rows;

  } catch (error){
    throw error;
  }

}


async function updateUser(id, fields = {}) {

  const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
  
    if (setString.length === 0) {
      return;
    }
  
    try {
      const { rows: [ users ] }= await client.query(`
        UPDATE users
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;
      `, Object.values(fields));
  
      return users;
    } catch (error) {
      throw error;
    }
  }


//Links helper functions
async function createLink({
    creatorId,
    name,
    url,
    clicks,
    comment,
    tags = []
}) {
    try {
        const { rows: [ link ] } = await client.query(`
         INSERT INTO links("creatorId", name, url, clicks, comment)
         VALUES($1,$2,$3,$4,$5)
         RETURNING *;`
        , [creatorId,name,url,clicks,comment]);
        
        console.log('tags are ', tags);
        const tagList = await createTags(tags);
        
        console.log('tagslist here is ', tagList);
        const taggedObj = await addTagsToLink(link.id, tagList);
        console.log('taggedObj is ', taggedObj);
        return taggedObj;

    } catch(error){
        throw error;
    }
}

async function updateLink(id, fields = {}) {
   
    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
  
    
    if (setString.length === 0) {
      return;
    }
  
    try {
      const { rows: [ link ] }= await client.query(`
        UPDATE links
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;
      `, Object.values(fields));
  
      return link;
    } catch (error) {
      throw error;
    }
  }


async function getAllLinks() {
    try{
        const { rows: linksIds } = await client.query(`
        SELECT * FROM links;
        `);

        const links = await Promise.all(linksIds.map(
          link => getLinkByLinkId( link.id )
        ));

      return links;

    } catch(error){
        throw error;
    }
}

async function getLinkByLinkId(linkId) {

    try {

      const { rows: [ link ]  } = await client.query(`
        SELECT *
        FROM links
        WHERE id=$1;
      `, [linkId]);
  
      if (!link) {
        throw {
          name: "LinkNotFoundError",
          message: "Could not find a Link with that linkId"
        };
      }
  
      const { rows: tags } = await client.query(`
        SELECT tags.*
        FROM tags
        JOIN link_tags ON tags.id=link_tags."tagId"
        WHERE link_tags."linkId"=$1;
      `, [linkId])
  
      const { rows: [username] } = await client.query(`
        SELECT *
        FROM users
        WHERE id=$1;
      `, [link.creatorId])
  
      link.tags = tags;
      link.username = username;
  
      delete link.username;
      return link;
    } catch (error) {
      throw error;
    }
  }

async function getLinkByUserId(userId) {
  try{
   const { rows } = await client.query(`
   SELECT * FROM links 
   WHERE "creatorId" = $1 
   `, [userId]);

   const linksArr = await Promise.all(rows.map(async (link)=>{
    const linkId = link.id;
    const linkTags = await getTagsByLinkId(linkId);
    const taggedLink = await addTagsToLink(linkId, linkTags);
    return taggedLink;
  }))
  
  return linksArr;

  }catch(error){
    throw error;
  }
}

async function destroyLink(linkId) {

    try {
      await client.query(`
      DELETE FROM links
      WHERE id = ${linkId};
      `);
      } catch(error){
         throw error;
        }
  }
  


//tags helper functions
async function createTags(tagList) {

    if (tagList.length === 0) { 
      return; 
    }
  
    const insertValues = tagList.map(
      (_, index) => `$${index + 1}`).join('), (');
    
    const selectValues = tagList.map(
      (_, index) => `$${index + 1}`).join(', ');

    try {
   
      await client.query(`
      INSERT INTO tags(name)
      VALUES (${ insertValues })
      ON CONFLICT (name) DO NOTHING;
      ` , tagList );
  
      const { rows } = await client.query(`
      SELECT * FROM tags
      WHERE name
      IN (${ selectValues }); `
      , tagList );

      return rows;
  
    } catch (error) {
      throw error;
    }
}


async function updateTag(id, fields = {}) {

  const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
  
    if (setString.length === 0) {
      return;
    }
  
    try {
      const { rows: [ tag ] }= await client.query(`
        UPDATE tags
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;
      `, Object.values(fields));
  
      return tag;
    } catch (error) {
      throw error;
    }
  }


async function createLinkTag(linkId, tagId) {
  try {
    await client.query(`
      INSERT INTO link_tags("linkId", "tagId")
      VALUES ($1, $2)
      ON CONFLICT ("linkId", "tagId") DO NOTHING;
    `, [linkId, tagId]);
  } catch (error) {
    throw error;
  }
}


async function addTagsToLink(linkId, tagList) {

    try {
      
      if (tagList===undefined){return await getLinkByLinkId(linkId)};

      const createLinkTagPromises = tagList.map(
        tag => createLinkTag(linkId, tag.id)
      );
  
      await Promise.all(createLinkTagPromises);

      return await getLinkByLinkId(linkId);
    } catch (error) {
      throw error;
    }
  }


async function getLinkByTagName(tagName) {
    try {
      const { rows: linkIds } = await client.query(`
        SELECT links.id
        FROM links
        JOIN link_tags ON links.id=link_tags."linkId"
        JOIN tags ON tags.id=link_tags."tagId"
        WHERE tags.name=$1;
      `, [tagName]);
  
      return await Promise.all(linkIds.map(
        link => getLinkByLinkId(link.id)
      ));
    } catch (error) {
      throw error;
    }
  } 
  

  async function getAllTags() {
  
    try {
  
      const { rows: tags } = await client.query(`
      SELECT * FROM tags;
      `);
      
     return tags;
  
    } catch (error) {
      throw error;
    }
  }




  async function destroyLinkTags(linkId) {
    try {
        await client.query(`
        DELETE FROM link_tags
        WHERE "linkId" = ${linkId};
        `);
     } catch(error){
        throw error;
    }
  }

  async function getTagsByLinkId(linkId){

    try{

      const { rows: tagIdArr } = await client.query(`
        SELECT "tagId" FROM link_tags
        WHERE "linkId"=${ linkId }
      `)
      
      const filteredIdArr = tagIdArr.filter((obj) => {return(obj.tagId !== null)});

      const tagsPromiseArr = filteredIdArr.map(async (tagIdObj) => {
        const { rows: [ arr ] } = await client.query(`
          SELECT name FROM tags
          WHERE id=${tagIdObj.tagId}
        `);
        return arr.name;
      });
      
      const tagsArr = await Promise.all(tagsPromiseArr);
      return tagsArr;
    }
    catch(error){
      console.error('Error getting tags by linkid in db/index.js. Error: ', error);
      throw error;
    }
  }
  


  

module.exports = {
    client,
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    createLink,
    updateLink,
    getAllLinks,
    createTags,
    updateTag,
    getAllTags,
    getLinkByLinkId,
    getLinkByTagName,
    createLinkTag,
    addTagsToLink,
    destroyLinkTags,
    destroyLink,
    getLinkByUserId,
    getTagsByLinkId,
}