const express = require("express");
const cors = require("cors");
const pool = require('./dbconnect');

const app = express();
app.use(cors());
// Use this to get access to req.body stuff
app.use(express.json());



// Create note
app.post("/notes", async (req, res) => {
    try {
        // Destructure the info you get from req.body to extract the title and memo to be added db
        const { title, memo } = req.body;
        const newNote = await pool.query("INSERT INTO note (title, memo) VALUES($1, $2)",
            [title, memo])

        res.json(newNote.rows[0]);
    } catch (error) {
        console.log(error.message);
    }

});

// Read all notes
app.get("/notes", async (req, res) => {
    try {
        const allNotes = await pool.query("SELECT * FROM note");

        res.json(allNotes.rows);
    } catch (error) {
        console.log(error.message)
    }

});

// Read a specific note
app.get('/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const note = await pool.query("SELECT * FROM note WHERE note_id = $1", [id]);
        res.json(note.rows[0]);
    } catch (error) {
        console.log(error.message)
    }

})

// Update & edit note
app.put("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, memo } = req.body;

        updatedNote = pool.query("UPDATE note SET title = $1, memo = $2 WHERE note_id = $3",
            [title, memo, id])

        res.json(`Note with id ${id} was udpated`);
    } catch (error) {
        console.log(error.message)
    }

});

// Delete a specific note note.
app.delete("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const toBeDeleted = pool.query("DELETE FROM note WHERE note_id = $1", [id]);

        res.json(`A note with with id of ${id} was deleted!`)
    } catch (error) {
        console.log(error.message)
    }

});

app.listen(5000, () => {
    console.log('Server started on port 5000!');
});
// NB: TODO: Use a reusable custom error middleware in your catch statements