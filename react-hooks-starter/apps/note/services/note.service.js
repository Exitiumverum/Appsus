import { storageService } from '../../../services/async-storage.service.js'
import { demoNotes } from './demo-data.js'

const NOTE_KEY = 'noteDB'

export const noteService = {
    query,
    save,
    remove,
    getEmptyNote,
    updateNote,
    togglePin,
}

// Fetch notes (from storage or create default ones)
function query() {
    return storageService.query(NOTE_KEY).then(notes => {
        if (!notes || !notes.length) {
            return storageService.postMany(NOTE_KEY, demoNotes).then(() => demoNotes) // Use demo notes
        }
        return notes
    })
}

// Save a note (create or update)
function save(note) {
    if (note.id) {
        return updateNote(note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

// Remove a note
function remove(noteId) {
    return query().then(notes => {
        const updatedNotes = notes.filter(note => note.id !== noteId) // Remove note by id
        return storageService.save(NOTE_KEY, updatedNotes) // Save updated notes
    })
}

// Update a specific note
function updateNote(updatedNote) {
    return query().then(notes => {
        const idx = notes.findIndex(note => note.id === updatedNote.id)
        if (idx === -1) throw new Error('Note not found')

        notes[idx] = updatedNote
        return storageService.save(NOTE_KEY, notes).then(() => updatedNote)
    })
}

function togglePin(noteId) {
    return query().then(notes => {
        const note = notes.find(note => note.id === noteId)
        if (!note) throw new Error('Note not found')

        note.isPinned = !note.isPinned
        return storageService.save(NOTE_KEY, notes).then(() => note)
    })
}


// Create an empty note template
function getEmptyNote(type = 'NoteTxt') {
    const emptyNote = {
        id: generateId(), // Add a unique ID generator
        type, // Dynamic type
        isPinned: false,
        style: { backgroundColor: '#ffffff' },
        info: {},
    }

    // Set default content based on type
    switch (type) {
        case 'NoteTxt':
            emptyNote.info.txt = ''
            break
        case 'NoteImg':
            emptyNote.info.url = ''
            emptyNote.info.title = 'New Image'
            break
        case 'NoteTodos':
            emptyNote.info.todos = []
            break
        case 'NoteVideo':
            emptyNote.info.url = ''
            emptyNote.info.title = 'New Video'
            break
        default:
            break
    }

    return emptyNote
}

// Generate a unique ID for new notes
function generateId() {
    return '_' + Math.random().toString(36).substring(2, 9)
}
