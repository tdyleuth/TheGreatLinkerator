const {
    client,
    createUser,
    getAllUsers,
    createLink,
    getAllTags,
    updateTag,
    getAllLinks,
    getLinkByLinkId,
    getLinkByTagName,

} = require('./index');

const bcrypt = require('bcrypt');

async function testDB() {
    try{
        console.log("Start db testing...")

        console.log("Finished db testing...")
        
        console.log("Testing getAllLinks")

        const results = await getAllLinks();
        console.log("Finished Testing getAllLinks", results)

        console.log("Testing getLinksByTagName");
        const linksbytagname = await getLinkByTagName("news");
        console.log("Finished Testing getAllLinksBytag", linksbytagname)

        console.log("Testing getLinksById");
        const test = await getLinkByLinkId(1);
        console.log("Result", test)
        console.log("Finished testing getLinksById");
       
        console.log("Testing getAllTags");
        const tags = await getAllTags();
        console.log("Result", tags)
        console.log("Finished testing getAllTags");

        console.log("Finished db testing")
    }catch(error){
        console.error("Error testing db!")
        throw error;
    }
}


async function createTables() {
    try{
        await client.query(
            `CREATE TABLE users (
             id SERIAL PRIMARY KEY,
             username VARCHAR(255) UNIQUE NOT NULL,
             password VARCHAR(255) NOT NULL,
             name VARCHAR(255) NOT NULL,
             active boolean DEFAULT true
            );`
        );

        await client.query(`
        CREATE TABLE links (
        id SERIAL PRIMARY KEY,
        "creatorId" INTEGER REFERENCES users(id) NOT NULL,
        name VARCHAR(255) NOT NULL,
        url VARCHAR(255) UNIQUE NOT NULL,
        clicks INTEGER,
        comment TEXT,
        "dateCreated" DATE NOT NULL DEFAULT CURRENT_DATE,
        "dateModified" DATE NOT NULL DEFAULT CURRENT_DATE,
        "lastAccessed" DATE NOT NULL DEFAULT CURRENT_DATE
        );`
    );

        await client.query(`
        CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
        );`
    );

        await client.query(`
        CREATE TABLE link_tags(
        id SERIAL PRIMARY KEY,
        "linkId" INTEGER REFERENCES links(id),
        "tagId" INTEGER REFERENCES tags(id),
        UNIQUE ("linkId", "tagId")
        );`
    );

     console.log("Finished creating tables!")
    } catch(error){
        console.error("Error creating tables!");
        throw error;
    }
}

async function dropTables() {
    try{
        console.log("Starting to drop tables...")

        await client.query(`
        DROP TABLE IF EXISTS link_tags;
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS links;
        DROP TABLE IF EXISTS users;
        `);
       console.log("Finished Dropping tables!")
    } catch(error){
        console.error("Error Dropping Tables!")
        throw error;
    }
}

async function createInitialUsers() {
   
    const tonyPass = 'password909';
    const yahyaPass = 'password121';
    const SALT_COUNT = 10;
    
    try {
    
    const tony = await createUser({
          username: 'tdyleuth', 
          password: await bcrypt.hash(tonyPass, SALT_COUNT),
          name: 'Tony'
         });
    
 
      const mona = await createUser({
          username: 'yhafez',
          password:  await bcrypt.hash(yahyaPass,SALT_COUNT),
          name: 'Yahya'
      });
 
      console.log("Finished creating users!");
    }
 
    catch(error){
        console.error("Error creating users!")
        throw error;
    }
 }
 
async function createInitialLinks(){
    const [ tony, yahya ] = await getAllUsers();

    try{
        console.log("Starting to create links...")

     await createLink({
         creatorId: tony.id,
         name: "google",
         url: "www.google.com",
         clicks:1,
         comment: "google is the best search engine",
         tags: ["search", "knowledge", "tool"]
     });

     await createLink({
        creatorId: tony.id,
        name: "stuff",
        url: "www.stuff.com",
        clicks:1,
        comment: "stuffis the best search engine",
        tags: ["search", "knowledge", "tool"]
    });

    await createLink({
        creatorId: tony.id,
        name: "test",
        url: "www.test.com",
        clicks:1,
        comment: "test the best search engine",
        tags: ["search", "knowledge", "tool"]
    });


     await createLink({
        creatorId: yahya.id,
        name: "apple",
        url: "www.apple.com",
        clicks:1,
        comment: "apple is the best search engine",
        tags: ["search", "knowledge", "tool"]
    });

     await createLink({
        creatorId: yahya.id,
        name: "reddit",
        url: "www.reddit.com",
        clicks:1,
        comment: "Get great content on Reddit",
        tags: ["news", "social", "entertainment"]
    });

    } catch(error){
      console.error("Error Creating Links")
      throw error;
    }
}

async function rebuildDB(){
    try{
        client.connect();
        console.log("Connected to DB!")

        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialLinks();
        

    } catch(error){
        console.error("Error building DB")
        throw error;
    }
}

rebuildDB()
.then(testDB)
.catch(console.error)
.finally(() => 
client.end()
);