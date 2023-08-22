import pool from "../../../../db";
let argon2 = require("argon2");

function validateLogin(body) {
    if (!body.username || !body.password) {
        return false;
    }
    const { username, password } = body;

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return regex.test(password);
}

//expects POST request with body.username and body.password
//returns response.ok, or response.message if error

export async function createuser(req, res) {

    if (!validateLogin(req.body)) {
        return res.status(400).json({message: "Password requirements not met"});
    }

    const { username, password } = req.body;

    let hash;
    try {
        hash = await argon2.hash(password);
    } catch (error) {
        console.log("HASH FAILED", error);
        return res.status(500).json({message: "Internal Issue"});
    }

    try {
        await pool.query("INSERT INTO userLogin (username, password) VALUES ($1, $2)", [username, hash]);
    } catch (error) {
        console.log("INSERT FAILED", error);
        return res.status(500).json({message: "Internal Issue"});
    }

    return res.status(200).json({ ok : true});
    
}






