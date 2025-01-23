const { useState } = React

export function NotePreview({ note, onRemoveNote, onEditNote, onTogglePin }) {
    const [isEditing, setIsEditing] = useState(false) // Track editing state
    const [editedContent, setEditedContent] = useState(note.info) // Store the updated content

    // Save edited content and exit editing mode
    const handleSave = () => {
        const updatedNote = { ...note, info: { ...editedContent } }
        onEditNote(updatedNote)
        setIsEditing(false)
    }

    const renderEditMode = () => {
        if (note.type === 'NoteTxt') {
            return (
                <textarea
                    value={editedContent.txt}
                    onChange={(e) => setEditedContent({ txt: e.target.value })}
                />
            )
        }
        if (note.type === 'NoteImg') {
            return (
                <input
                    type="text"
                    value={editedContent.url}
                    onChange={(e) => setEditedContent({ url: e.target.value })}
                    placeholder="Image URL"
                />
            )
        }
        if (note.type === 'NoteTodos') {
            return (
                <textarea
                    value={editedContent.todos.map(todo => todo.txt).join(', ')}
                    onChange={(e) => {
                        const todos = e.target.value.split(',').map(txt => ({ txt: txt.trim(), done: false }))
                        setEditedContent({ todos })
                    }}
                />
            )
        }
        if (note.type === 'NoteVideo') {
            return (
                <input
                    type="text"
                    value={editedContent.url}
                    onChange={(e) => setEditedContent({ url: e.target.value })}
                    placeholder="Video URL"
                />
            )
        }
        return <p>Unsupported note type</p>
    }

    const renderDisplayMode = () => {
        return (
            <div>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                <button onClick={() => onTogglePin(note.id)}>
                    {note.isPinned ? 'Unpin' : 'Pin'}
                </button>
            </div>
        )
    }

    return (
        <article style={{ backgroundColor: note.style.backgroundColor }}>
            {isEditing ? (
                <div>
                    {renderEditMode()}
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>{note.info.txt || note.info.url || 'Unsupported note type'}</p>
                    {renderDisplayMode()}
                </div>
            )}
        </article>
    )
}
