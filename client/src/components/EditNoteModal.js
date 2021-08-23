import React, { useState } from 'react';

const EditNoteModal = ({ noteMemo }) => {
    // Use hooks to setup component state
    const [note, setNote] = useState({
        title: noteMemo.title,
        memo: noteMemo.memo
    })

    function handleChange(e) {
        const { name, value } = e.target;

        setNote((prevNote) => {
            return {
                // Keeps a hold of the old state data
                ...prevNote,
                [name]: value,
            };
        });
    }

    const updateNote = async (e) => {
        e.preventDefault();

        try {
            //Destructure title and memo from state object
            const { title, memo } = note

            const response = await fetch(`http://localhost:5000/notes/${noteMemo.note_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, memo })
            })

            console.log('Edit a note related  to: ', response)
            window.location = "/";

        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            {/* <form>
                <input
                    name="title"
                    onChange={handleChange}
                    value={note.title}
                />
                <textarea
                    name="memo"
                    onChange={handleChange}
                    value={note.memo}

                />
                <button onClick={updateNote}>Add</button>
            </form> */}
            <button
                type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target={`#id${noteMemo.note_id}`}
            >
                Edit
            </button>
            <div className="modal" id={`id${noteMemo.note_id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form className="form-control" >
                            <div className="modal-body">
                                <input
                                    name="title"
                                    onChange={handleChange}
                                    value={note.title}
                                    placeholder="Update your title"
                                />
                                <textarea
                                    name="memo"
                                    onChange={handleChange}
                                    value={note.memo}
                                    placeholder="Update your note..."
                                />
                            </div>

                            <div className="modal-footer">
                                <button className="btn-warning" onClick={updateNote}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
};

export default EditNoteModal;