import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onRemoveNote }) {
    return (
        <section className="note-list">
            {notes.length
                ? notes.map(note => (
                    <NotePreview
                        key={note.id}
                        note={note}
                        onRemoveNote={onRemoveNote}
                    />
                ))
                : <p className="no-notes">No notes available. Start by adding one!</p>}
        </section>
    )
}

