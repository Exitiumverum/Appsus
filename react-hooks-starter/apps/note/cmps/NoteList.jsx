import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onRemoveNote, onUpdateNote }) {
    return (
        <section className="note-list">
            {notes.map(note => (
                <NotePreview
                    key={note.id}
                    note={note}
                    onRemoveNote={onRemoveNote}
                    onUpdateNote={onUpdateNote} // Pass this function
                />
            ))}
        </section>
    )
}



