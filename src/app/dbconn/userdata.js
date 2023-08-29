//DB connection to get all the data for a user.

import pool from "../../components/db";

//expects GET requests with active session
//returns JSON with favorite genres and liked articles

export async function getUserData (req, res) {

    if (!req.session.user.isLoggedIn) {
        return res.status(400).json({message: "User not logged in"});
    }

    const username = req.session.user.username;
    try {
        let result = await pool.query("SELECT * FROM userLogin WHERE username = $1", [username]);
        if (result.rows.length === 0) {
            return res.status(500).json({message: "Internal Error"});
        }
    
        let genres = result.rows[0].favgenres;
        let likedArticles = result.rows[0].likedarticles;
        res.status(200).json({genres: genres, likedArticles: likedArticles});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}