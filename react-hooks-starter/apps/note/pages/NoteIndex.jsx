const { useState, useEffect } = React
import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'

console.log('NoteList is:', NoteList)

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState({ txt: '', type: 'all' })
    const [noteContent, setNoteContent] = useState('')
    const [noteType, setNoteType] = useState('NoteTxt')

    useEffect(() => {
        loadNotes()
    }, [])

    const loadNotes = () => {
        noteService.query().then(setNotes)
    }

    const onAddNote = () => {
        const newNote = noteService.getEmptyNote()
        newNote.type = noteType
        newNote.info = getNoteInfo(noteType, noteContent)
        noteService.save(newNote).then(() => {
            setNoteContent('')
            loadNotes()
        })
    }

    function onRemoveNote(noteId) {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
    }

    function onEditNote(updatedNote) {
        setNotes(prevNotes => prevNotes.map(note => note.id === updatedNote.id ? updatedNote : note))
    }

    
    function onTogglePin(noteId) {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
            )
        )
    }

    const getNoteInfo = (type, content) => {
        if (type === 'NoteTxt') return { txt: content }
        if (type === 'NoteImg') return { url: content, title: '' }
        if (type === 'NoteTodos') {
            const todos = content.split(',').map(txt => ({ txt: txt.trim(), done: false }))
            return { todos }
        }
        if (type === 'NoteVideo') return { url: content, title: '' }
        return {}
    }

    const onSetFilter = ({ target }) => {
        const { name, value } = target
        setFilterBy(prevFilter => ({ ...prevFilter, [name]: value }))
    }

    const getFilteredNotes = () => {
        return notes.filter(note => {
            let matchesTxt = false
            if (note.info) {
                if (note.info.txt && note.info.txt.toLowerCase().includes(filterBy.txt.toLowerCase())) {
                    matchesTxt = true
                }
                if (note.info.url && note.info.url.toLowerCase().includes(filterBy.txt.toLowerCase())) {
                    matchesTxt = true
                }
            }
            const matchesType = filterBy.type === 'all' || note.type === filterBy.type
            return matchesTxt && matchesType
        })
    }

    return (
        <section>
            <div>
                <select value={noteType} onChange={(e) => setNoteType(e.target.value)}>
                    <option value="NoteTxt">Text Note</option>
                    <option value="NoteImg">Image Note</option>
                    <option value="NoteTodos">Todos Note</option>
                    <option value="NoteVideo">Video Note</option>
                </select>
                <input
                    type="text"
                    placeholder="Enter note content..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                />
                <button onClick={onAddNote}>Add Note</button>
            </div>
            <div>
                <input
                    type="text"
                    name="txt"
                    placeholder="Search notes..."
                    value={filterBy.txt}
                    onChange={onSetFilter}
                />
                <select name="type" value={filterBy.type} onChange={onSetFilter}>
                    <option value="all">All Notes</option>
                    <option value="NoteTxt">Text</option>
                    <option value="NoteImg">Images</option>
                    <option value="NoteTodos">Todos</option>
                    <option value="NoteVideo">Videos</option>
                </select>
            </div>
            <NoteList
                notes={getFilteredNotes()} // Pass filtered notes to the list
                onRemoveNote={onRemoveNote}
                onEditNote={onEditNote}
                onTogglePin={onTogglePin}

            />
        </section>
    )
}
