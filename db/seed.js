const {
    client,
    createBookmark,
} = require('./index');


async function testDB() {
    try{
        console.log("Start db testing...")
        
    }catch(error){
        console.error("Error testing db!")
        throw error;
    }
}

async function createTables() {
    try{
        await client.query(`
        CREATE TABLE links (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        url VARCHAR(255) UNIQUE NOT NULL,
        clicks INTEGER,
        comment TEXT NOT NULL,
        CreatedDate DATE NOT NULL DEFAULT CURRENT_DATE
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
        `);
       console.log("Finished Dropping tables!")
    } catch(error){
        console.error("Error Dropping Tables!")
        throw error;
    }
}

async function createInitialLinks(){
    try{
        console.log("Starting to create links...")
     await createBookmark({
         name: "google",
         url: "www.google.com",
         clicks:1,
         comment: "google is the best search engine"
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