const { Client } = require('pg');

const client = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/linkerator');

async function createBookmark({
    name,
    url,
    clicks,
    comment
}) {
    try {
        const { rows: [ links ] } = await client.query(`
         INSERT INTO links(name, url, clicks, comment)
         VALUES($1,$2,$3,$4)
         RETURNING *;`
        , [name,url,clicks,comment]);

    return links; 
    } catch(error){
        throw error;
    }
}

module.exports = {
    client,
    createBookmark,
}