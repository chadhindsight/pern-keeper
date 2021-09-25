import React, { useState, useEffect } from 'react';
import EditNoteModal from './EditNoteModal';

const ListNotes = () => {
    const [notes, setNotes] = useState([]);

    // Get all notes from the db
    const getNotes = async () => {
        try {
            const response = await fetch("http://localhost:5001/notes");
            const jsonData = await response.json();

            setNotes(jsonData);
        } catch (error) {
            console.log(`${error} Sorry can't get your notes :(`)
        }

    }

    useEffect(() => {
        getNotes();
    }, []);

    // console.log(notes)

    const deleteNote = async (id) => {
        try {
            const deleted = await fetch(`http://localhost:5001/${id}`, { method: "Delete" });
            console.log(deleted)
            // Return the updated list of notes
            setNotes(notes.filter(note => note.note_id !== id));

        } catch (error) {
            console.log(`${error} Sorry that note was not deleted`)
        }
    }

    return (
        <div>
            {/* Maybe only render EditNoteModal if notes ! == null  */}
            {notes?.map(noteMemo => {

                return <div key={noteMemo.note_id}>
                    <h1>{noteMemo.title}</h1>
                    <p>{noteMemo.memo}</p>

                    <EditNoteModal noteMemo={noteMemo} />

                    <button
                        className="btn btn-danger"
                        onClick={() => deleteNote(noteMemo.note_id)}
                    >
                        -
                    </button>
                </div>
            })}
        </div>
    );
};

export default ListNotes;