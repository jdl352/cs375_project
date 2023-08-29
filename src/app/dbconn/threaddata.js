//DB connection to get/add all the data for a thread.

import pool from "../../components/db";

//getThreadData expects GET requests with an active, logged in user session, NO PARAMS
//returns object containing all threads as JSON objects

export async function getThreadDataAll (req, res) {

    if (!req.session.user.isLoggedIn) {
        return res.status(400).json({message: "User not logged in"});
    }

    //const username = req.session.user.username;
    try {
        let result = await pool.query("SELECT * FROM threads");
        if (result.rows.length === 0) {
            return res.status(500).json({message: "No threads in DB yet"});
        }
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
}

//getThreadDataById expects GET requests with an active, logged in user session, params in body as mentioned below
//params needed: threadid
//returns object representing a single thread with threadid = req.body.threadid

export async function getThreadDataById (req, res) {

    if (!req.session.user.isLoggedIn) {
        return res.status(400).json({message: "User not logged in"});
    }
    if (!req.body.threadid) {
        return res.status(400).json({message: "Body parameters not fulfilled"});
    }
    try {
        let result = await pool.query("SELECT * FROM threads WHERE threadid = $1", [req.body.threadid]);
        if (result.rows.length === 0) {
            return res.status(500).json({message: "Thread ID not found"});
        }
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
}

//addThread expects POST requests with an active, logged in user session, amd relevant params in body
//params needed: messagebody: String(2000)

export async function addThread (req, res) {

    if (!req.session.user.isLoggedIn) {
        return res.status(400).json({message: "User not logged in"});
    }

    const username = req.session.user.username;
    if (!req.body.messagebody || (req.body.messagebody.length > 2000)) {
        return res.status(400).json({message: "Body parameters not fulfilled"});
    }
    try {
        await pool.query("INSERT INTO threads(username, meessagebody) VALUES ($1, $2)", [username, req.body.messagebody]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    return res.status(200).json({ ok : true});
    
}

//getThreadByUsername expects GET requests with an active, logged in user session, NO PARAMS
//fetches all the threads created by logged in user
//returns object containing all relevant threads as JSON objects

export async function getThreadByUsername (req, res) {

    if (!req.session.user.isLoggedIn) {
        return res.status(400).json({message: "User not logged in"});
    }

    const username = req.session.user.username;
    try {
        let result = await pool.query("SELECT * FROM threads WHERE username = $1", [username]);
        //not checking if length is 0 sinc ethat simply means user has not created any threads yet, should not be logged as an error anywhere.
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
}