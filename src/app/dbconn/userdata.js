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
        
        let country = result.rows[0].country;
        let genres = result.rows[0].favgenres;
        let likedthreads = result.rows[0].likedthreads;
        res.status(200).json({"country": country, "genres": genres, "likedthreads": likedthreads});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

//expects POST requests with active session, params i body as stated below
//params: country: String(50), favgenres : List<String>, likedthreads : List<String>
//returns JSON with favorite genres and liked articles

export async function setUserData (req, res) {
    if (!req.session.user.isLoggedIn) {
        return res.status(400).json({message: "User not logged in"});
    }

    if (   !req.body.country || !req.body.likedthreads || !req.body.favgenres
        || req.body.country.length > 50) {
        return res.status(400).json({message: "Body parameters not fulfilled"});
    }

    const username = req.session.user.username;
    try {
        values = [req.body.country, req.body.favgenres, req.body.likedthreads];
        await pool.query("INSERT INTO userLogin(country, favgenres, likedthreads) VALUES ($1, $2, $3)", values);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    return res.status(200).json({ ok : true});

}

//IMP todo create function to addUserData / modifyUserData for favgenres and likedarticles