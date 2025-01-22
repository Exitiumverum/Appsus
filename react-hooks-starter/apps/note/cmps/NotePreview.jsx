import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
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
            <button className="btn-remove" onClick={() => onRemoveNote(note.id)}>
                🗑️
            </button>
        </article>
    )
}


