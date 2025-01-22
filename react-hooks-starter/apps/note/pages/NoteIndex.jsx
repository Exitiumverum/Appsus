const { useEffect, useState } = React
import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [noteType, setNoteType] = useState('NoteTxt') // Default to text note
    const [noteContent, setNoteContent] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(setNotes)
            .catch(() => displayError('Failed to load notes'))
    }

    function onAddNote() {
        if (!noteContent.trim()) {
            displayError('Note content cannot be empty')
            return
        }

        const newNote = noteService.getEmptyNote()
        newNote.type = noteType
        newNote.info = getNoteInfo(noteType, noteContent)

        noteService.save(newNote)
            .then(() => {
                setNoteContent('')
                loadNotes()
            })
            .catch(() => displayError('Failed to add note'))
    }

    function getNoteInfo(type, content) {
        switch (type) {
            case 'NoteTxt':
                return { txt: content }
            case 'NoteImg':
                return { url: content, title: 'Image Note' }
            case 'NoteTodos':
                const todos = content.split(',').map(todo => ({
                    txt: todo.trim(),
                    done: false,
                }))
                return { todos }
            default:
                return { txt: content }
        }
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => loadNotes())
            .catch(() => displayError('Failed to remove note'))
    }

    function onUpdateNote(updatedNote) {
        noteService.updateNote(updatedNote)
            .then(() => loadNotes())
            .catch(() => displayError('Failed to update note'))
    }

    function displayError(message) {
        setErrorMsg(message)
        setTimeout(() => setErrorMsg(''), 3000)
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
            {errorMsg && <div className="error-msg">{errorMsg}</div>}
            <NoteList
                notes={notes}
                onRemoveNote={onRemoveNote}
                onUpdateNote={onUpdateNote} // Pass this function to handle note updates
            />
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
