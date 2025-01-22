const { useEffect, useState } = React
import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query().then(setNotes)
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            loadNotes()
        })
    }

    return (
        <section className="note-index">
            <h1>MissKeep</h1>
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
        </section>
    )
}