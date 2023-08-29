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