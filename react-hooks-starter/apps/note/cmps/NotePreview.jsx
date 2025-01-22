export function NotePreview({ note, onRemoveNote }) {
    return (
        <article className="note-preview" style={{ backgroundColor: note.style.backgroundColor }}>
            <div className="note-content">
                <p>{note.info.txt}</p>
            </div>
            <button className="btn-remove" onClick={() => onRemoveNote(note.id)}>
                🗑️
            </button>
        </article>
    )
}
