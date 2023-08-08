import pool from "../../../db";

let argon = require("argon2");

function validateLogin(body) {
    //TODO
    return true;
}

async function authenticate(req, res) {

    let { body } = req;
    const { username, password } = body;

    if (!validateLogin(body)) {
        return res.status(400).json(); // TODO
    }

    let result;
    try {
        result = await pool.query("SELECT password FROM userLogin WHERE username = $1", [username]);
    } catch (error) {
        console.log("SELECT FAILED", error);
        return res.status(500).send(); // TODO
    }

    // username doesn't exist
    if (result.rows.length === 0) {
        return res.status(400).send(); // TODO
    }

    let hashed = result.rows[0].password;

    let verifyResult;
    try {
        verifyResult = await argon2.verify(hashed, password);
    } catch (error) {
        console.log("VERIFY FAILED", error);
        return res.status(500).send(); // TODO
    }

    if (!verifyResult) {
        console.log("Credentials didn't match");
        return res.status(400).send(); // TODO
    }
    //need to add cookie functionality
    return res.status(200).send();
    
}