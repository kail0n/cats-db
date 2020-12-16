const { Pool } = require("pg");

const pool = new Pool({ database: 'cat-home'});

function run(q, values, callback){
    return pool.query(q, values, callback);
};

module.exports = { run };