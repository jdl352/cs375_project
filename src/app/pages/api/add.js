import pool from "../../../db";

let argon = require("argon2");

function validateLogin(body) {
    //TODO
    return true;
}

async function createnewuser(req, res) {

    const { username, password } = req.body;

    if (!validateLogin(body)) {
        return res.status(400).json(); // TODO
    }

    let hash;
    try {
        hash = await argon2.hash(password);
    } catch (error) {
        console.log("HASH FAILED", error);
        return res.status(500).send(); // TODO
    }

    try {
        await pool.query("INSERT INTO userLogin (username, password) VALUES ($1, $2)", [username, hash]);
    } catch (error) {
        console.log("INSERT FAILED", error);
        return res.status(500).send(); // TODO
    }

    return res.status(200).send();
    
}