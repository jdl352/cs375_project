//DB connection to get/add all the data for a thread.

import pool from "../../components/db";

//getCommentDataByThreadId expects GET requests with an active, logged in user session, params in req.body as below 
//params needed: threadid: number
//returns object containing all comments as JSON objects

export async function getCommentDataByThreadId (req, res) {

    if (!req.session.user.isLoggedIn) {
        return res.status(400).json({message: "User not logged in"});
    }
    if (!req.body.threadid) {
        return res.status(400).json({message: "Body parameters not fulfilled"});
    }
    
    try {
        let result = await pool.query("SELECT * FROM comments WHERE threadid = $1", [req.body.threadid]);
        //no error raised if result.rows.length == 0 since expected behavior, can absolutely have threads with no comments on them.
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
}

//getCommentDataByUsername expects GET requests with an active, logged in user session, NO PARAMS
//returns object containing all comments by currently loggde in user as JSON objects

export async function getCommentDataByUsername (req, res) {

    if (!req.session.user.isLoggedIn) {
        return res.status(400).json({message: "User not logged in"});
    }
    const username = req.session.user.username; 
    try {
        let result = await pool.query("SELECT * FROM threads WHERE username = $1", [username]);
        //no error raised if result.rows.length == 0 since expected behavior, can absolutely have threads with no comments on them.
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
}

//addComment expects POST requests with an active, logged in user session, amd relevant params in body
//params needed: threadid: int, comment: string(200)

export async function addComment (req, res) {

    if (!req.session.user.isLoggedIn) {
        return res.status(400).json({message: "User not logged in"});
    }
    if (!req.body.threadid || !req.body.comment || (req.body.comment.length > 200)) {
        return res.status(400).json({message: "Body parameters not fulfilled"});
    }

    const username = req.session.user.username;
    
    try {
        await pool.query("INSERT INTO comments(threadid, username, comment) VALUES ($1, $2, $3)", [req.body.threadid, username, req.body.comment]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    return res.status(200).json({ ok : true});
    
}