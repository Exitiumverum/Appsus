const { useEffect, useState } = React
import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [noteType, setNoteType] = useState('NoteTxt') // Default to text note
    const [noteContent, setNoteContent] = useState('')

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query().then(setNotes)
    }

    function onAddNote() {
        if (!noteContent.trim()) return

        const newNote = noteService.getEmptyNote()
        newNote.type = noteType
        newNote.info = getNoteInfo(noteType, noteContent)

        noteService.save(newNote).then(() => {
            setNoteContent('')
            loadNotes()
        })
    }

    function getNoteInfo(type, content) {
        switch (type) {
            case 'NoteTxt':
                return { txt: content }
            case 'NoteImg':
                return { url: content, title: 'Image Note' }
            case 'NoteTodos':
                const todos = content.split(',').map(todo => ({ txt: todo.trim(), done: false }))
                return { todos }
            default:
                return { txt: content }
        }
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => loadNotes())
    }

    return (
        <section className="note-index">
            <div className="note-add">
                <select value={noteType} onChange={(e) => setNoteType(e.target.value)}>
                    <option value="NoteTxt">Text Note</option>
                    <option value="NoteImg">Image Note</option>
                    <option value="NoteTodos">Todo Note</option>
                </select>
                <input
                    type="text"
                    placeholder={getPlaceholder(noteType)}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                />
                <button onClick={onAddNote}>Add Note</button>
            </div>
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
        </section>
    )
}

function getPlaceholder(noteType) {
    switch (noteType) {
        case 'NoteTxt':
            return 'Enter your text...'
        case 'NoteImg':
            return 'Enter image URL...'
        case 'NoteTodos':
            return 'Enter comma-separated todos...'
        default:
            return 'Enter your note...'
    }
}
