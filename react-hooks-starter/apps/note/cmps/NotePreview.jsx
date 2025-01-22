import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
const { useState } = React

export function NotePreview({ note, onRemoveNote, onUpdateNote, onTogglePin }) {
    const [isEditing, setIsEditing] = useState(false) // Track editing state
    const [editedContent, setEditedContent] = useState(note.info) // Store the updated content

    function handleSave() {
        const updatedNote = { ...note, info: editedContent }
        onUpdateNote(updatedNote) // Call the update function
        setIsEditing(false) // Exit editing mode
    }

    function renderNoteContent() {
        if (isEditing) {
            return (
                <div className="note-edit">
                    {note.type === 'NoteTxt' && (
                        <textarea
                            value={editedContent.txt}
                            onChange={(e) => setEditedContent({ ...editedContent, txt: e.target.value })}
                        />
                    )}
                    {note.type === 'NoteImg' && (
                        <input
                            type="text"
                            value={editedContent.url}
                            placeholder="Enter image URL"
                            onChange={(e) => setEditedContent({ ...editedContent, url: e.target.value })}
                        />
                    )}
                    {note.type === 'NoteTodos' && (
                        <textarea
                            value={editedContent.todos.map(todo => todo.txt).join(', ')}
                            onChange={(e) => {
                                const todos = e.target.value.split(',').map(txt => ({ txt: txt.trim(), done: false }))
                                setEditedContent({ ...editedContent, todos })
                            }}
                        />
                    )}
                    <div className="note-edit-actions">
                        <button onClick={handleSave} className="btn-save">Save</button>
                        <button onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
                    </div>
                </div>
            )
        }

        // Normal rendering when not in edit mode
        switch (note.type) {
            case 'NoteTxt':
                return <p>{note.info.txt}</p>
            case 'NoteImg':
                return <NoteImg note={note} />
            case 'NoteTodos':
                return <NoteTodos note={note} onUpdateNote={onUpdateNote} />
            default:
                return <p>Unsupported note type</p>
        }
    }

    return (
        <article
            className="note-preview"
            style={{ backgroundColor: note.style.backgroundColor }}
        >
            <div className="note-content">{renderNoteContent()}</div>
            <div className="note-actions">
                {!isEditing && (
                    <button className="btn-edit" onClick={() => setIsEditing(true)}>
                        ✏️ Edit
                    </button>
                )}
                <button className="btn-pin" onClick={() => onTogglePin(note.id)}>
                    {note.isPinned ? '📌 Unpin' : '📍 Pin'}
                </button>
                <button className="btn-remove" onClick={() => onRemoveNote(note.id)}>
                    🗑️ Delete
                </button>
            </div>
        </article>
    )
}
