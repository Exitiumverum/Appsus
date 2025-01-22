import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'

export function NotePreview({ note, onRemoveNote, onUpdateNote, onTogglePin }) {
    function renderNoteContent() {
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
