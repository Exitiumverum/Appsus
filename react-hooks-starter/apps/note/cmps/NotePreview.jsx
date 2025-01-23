import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteTxt } from './NoteText.jsx'
import { NoteVideo } from './NoteVideo.jsx'
const { useState } = React

export function NotePreview({ note, onRemoveNote, onUpdateNote, onTogglePin }) {
    const [isEditing, setIsEditing] = useState(false) // Track editing state
    const [editedContent, setEditedContent] = useState({ ...note.info }) // Clone the content to avoid direct mutation

    function handleSave() {
        const updatedNote = { ...note, info: editedContent }
        onUpdateNote(updatedNote) // Call the update function
        setIsEditing(false) // Exit editing mode
    }

    function handleColorChange(color) {
        const updatedNote = { ...note, style: { ...note.style, backgroundColor: color } }
        onUpdateNote(updatedNote) // Update the note's background color
    }

    function renderEditingContent() {
        switch (note.type) {
            case 'NoteTxt':
                return (
                    <textarea
                        className="edit-textarea"
                        value={editedContent.txt}
                        onChange={(e) => setEditedContent({ ...editedContent, txt: e.target.value })}
                    />
                )
            case 'NoteImg':
                return (
                    <input
                        className="edit-input"
                        type="text"
                        value={editedContent.url}
                        placeholder="Enter image URL"
                        onChange={(e) => setEditedContent({ ...editedContent, url: e.target.value })}
                    />
                )
            case 'NoteTodos':
                return (
                    <textarea
                        className="edit-textarea"
                        value={editedContent.todos.map(todo => todo.txt).join(', ')}
                        onChange={(e) => {
                            const todos = e.target.value.split(',').map(txt => ({ txt: txt.trim(), done: false }))
                            setEditedContent({ ...editedContent, todos })
                        }}
                    />
                )
            default:
                return <p>Unsupported note type</p>
        }
    }

    function renderNoteContent() {
        if (isEditing) {
            return (
                <div className="note-edit">
                    {renderEditingContent()}
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
                return <NoteTxt note={note} />
            case 'NoteImg':
                return <NoteImg note={note} />
            case 'NoteTodos':
                return <NoteTodos note={note} onUpdateNote={onUpdateNote} />
            case 'NoteVideo': // Add support for video notes
                return <NoteVideo note={note} />
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
            <div className="note-color-picker">
                <label htmlFor={`color-${note.id}`}>🎨 Color:</label>
                <input
                    id={`color-${note.id}`}
                    type="color"
                    value={note.style.backgroundColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                />
            </div>
        </article>
    )
}
