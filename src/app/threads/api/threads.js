import pool from "../../../components/db";

async function getThreadDataAll (req, res) {

    if (!req.session.user.isLoggedIn) {
        return res.status(400).json({message: "User not logged in"});
    }

    const username = req.session.user.username;
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