const { Fragment } = React
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteTxt } from './NoteTxt.jsx'
import { NoteVideo } from './NoteVideo.jsx'
const { useState } = React

export function NotePreview({ note, onRemoveNote, onUpdateNote, onTogglePin }) {
    const [isEditing, setIsEditing] = useState(false) // Track editing state
    const [editedContent, setEditedContent] = useState({ ...note.info }) // Copy note info for editing

    // Save changes after editing
    function handleSave() {
        const updatedNote = { ...note, info: editedContent }
        onUpdateNote(updatedNote)
        setIsEditing(false)
    }


    // Change note background color
    function handleColorChange(color) {
        const updatedNote = { ...note, style: { ...note.style, backgroundColor: color } }
        onUpdateNote(updatedNote)
    }

    // Render editable content based on note type
    function renderEditingContent() {
        switch (note.type) {
            case 'NoteTxt':
                return (
                    <textarea
                        value={editedContent.txt}
                        onChange={(e) => setEditedContent({ ...editedContent, txt: e.target.value })}
                    />
                )
            case 'NoteImg':
            case 'NoteVideo':
                return (
                    <input
                        type="text"
                        value={editedContent.url}
                        placeholder={`Enter ${note.type === 'NoteImg' ? 'image' : 'video'} URL`}
                        onChange={(e) => setEditedContent({ ...editedContent, url: e.target.value })}
                    />
                )
            case 'NoteTodos':
                return (
                    <textarea
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

    // Render normal content when not editing
    function renderNoteContent() {
        switch (note.type) {
            case 'NoteTxt':
                return <NoteTxt note={note} />
            case 'NoteImg':
                return <NoteImg note={note} />
            case 'NoteTodos':
                return <NoteTodos note={note} onUpdateNote={onUpdateNote} />
            case 'NoteVideo':
                return <NoteVideo note={note} />
            default:
                return <p>Unsupported note type</p>
        }
    }

    return (
        <article className="note-preview" style={{ backgroundColor: note.style.backgroundColor || '#ffffff' }}>
            <div className="note-content">
                {isEditing ? renderEditingContent() : renderNoteContent()}
            </div>
            <div className="note-actions">
                {isEditing ? (
                    <React.Fragment>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={() => onTogglePin(note.id)}>
                            {note.isPinned ? 'Unpin' : 'Pin'}
                        </button>
                        <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                        <button
                            onClick={() => {
                                const emailUrl = `./misterEmail/index.html?subject=${encodeURIComponent(note.type)}&body=${encodeURIComponent(JSON.stringify(note.info))}`
                                window.open(emailUrl, '_blank')
                            }}
                        >
                            Send to Email
                        </button>
                    </React.Fragment>
                )}
            </div>
            <div className="note-color-picker">
                <label>Color:</label>
                <input
                    type="color"
                    value={note.style.backgroundColor || '#ffffff'}
                    onChange={(e) => handleColorChange(e.target.value)}
                />
            </div>
        </article>
    )
}
