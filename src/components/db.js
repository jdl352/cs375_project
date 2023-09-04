const { Pool } = require('pg');
let env = require("../../env.json");

const pool = new Pool(env);

module.exports = pool;
//used as import pool from "db", then pool.query()