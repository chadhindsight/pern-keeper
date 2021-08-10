import React, { useState, useEffect } from 'react';


const ListNotes = () => {
    const [notes, setNotes] = useState([]);

    // Get all notes from the db
    const getNotes = async () => {
        try {
            const response = await fetch("http://localhost:5000/notes");
            const jsonData = await response.json();

            setNotes(jsonData);
        } catch (error) {
            console.log(`${error} Sorry can't get your notes :(`)
        }

    }

    useEffect(() => {
        getNotes();
    }, []);

    console.log(notes)

    const deleteNote = async (id) => {
        try {
            const deleted = await fetch(`http://localhost:5000/${id}`, { method: "Delete" });
            console.log(deleted)
            // Return the updated list of notes
            setNotes(notes.filter(note => note.note_id !== id));

        } catch (error) {
            console.log(`${error} Sorry that note was not deleted`)
        }
    }

    return (
        <div>
            <ul>
                {notes.map(noteMemo => {
                    // Each one gets an EditNote model & Delete button
                    <button
                        className="btn btn-danger"
                        onClick={() => deleteNote(noteMemo.note_id)}
                    >
                        -
                    </button>
                })}
            </ul>
        </div>
    );
};

export default ListNotes;