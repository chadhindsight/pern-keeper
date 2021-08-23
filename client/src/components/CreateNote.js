import React, { useState } from 'react';

const CreateNote = () => {
    const [newNote, setNewNote] = useState({
        title: "",
        memo: ""
    })

    function handleChange(e) {
        const { name, value } = e.target;

        setNewNote((prevNote) => {
            return {
                // Keeps a hold of the old state data
                ...prevNote,
                [name]: value,
            };
        });
    }

    const submitNote = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/notes', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newNote)
            })
            console.log(response)

        } catch (error) {
            console.log(`${error} Sorry, could not submit your new note`)
        }
    }

    return (
        <div>
            <form>
                <input
                    name="title"
                    onChange={handleChange}
                    value={newNote.title}
                />
                <textarea
                    name="memo"
                    onChange={handleChange}
                    value={newNote.memo}

                />
                <button onClick={submitNote}>Add</button>
            </form>
        </div>
    );
};
// More work soon come!
export default CreateNote;