import React, { useState } from 'react';

const EditNoteModal = ({ noteMemo }) => {
    // Use hooks to setup component state
    const [note, setNote] = useState({
        title: noteMemo.title,
        memo: noteMemo.memo
    })

    const updateNote = async (e) => {
        e.preventDefault();

        try {
            //Destructure title and memo from state object
            const { title, memo } = { note }

            const response = await fetch(`http://localhost:5000/notes/${noteMemo.note_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, memo })
            })

            console.log('Edit a note related: ', response)
            window.location = "/";

        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <>
            <button
                type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target={`#id${noteMemo.note_id}`}
            >
                Edit
            </button>

            {/* 
        id = id10
      */}
            <div
                className="modal"
                id={`id${noteMemo.note_id}`}
                onClick={() => setNote(note)}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                onClick={() => setNote(note)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={note.title}
                                onChange={e => setNote(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control"
                                value={note.memo}
                                onChange={e => setNote(e.target.value)}
                            />
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-dismiss="modal"
                                onClick={e => updateNote(e)}
                            >
                                Edit
                            </button>
                            {/* CLOSE BUTTON */}
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => setNote(note)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditNoteModal;