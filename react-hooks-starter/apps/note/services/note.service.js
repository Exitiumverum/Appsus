import { storageService } from '../../../services/async-storage.service.js'
import { demoNotes } from './demo-data.js'

const NOTE_KEY = 'noteDB'

export const noteService = {
    query,
    save,
    remove,
    getEmptyNote,
    updateNote, // Added update method
}

// Fetch notes (from storage or create default ones)
function query() {
    return storageService.query(NOTE_KEY).then(notes => {
        if (!notes.length) {
            storageService.postMany(NOTE_KEY, demoNotes) // Use demo notes
            return demoNotes
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
    return storageService.remove(NOTE_KEY, noteId)
}

// Update a specific note
function updateNote(updatedNote) {
    return query().then(notes => {
        const idx = notes.findIndex(note => note.id === updatedNote.id)
        if (idx === -1) throw new Error('Note not found')
        notes[idx] = updatedNote
        return storageService.put(NOTE_KEY, updatedNote)
    })
}

// Create an empty note template
function getEmptyNote() {
    return {
        id: '',
        type: 'NoteTxt', // Default type
        isPinned: false,
        style: { backgroundColor: '#fff' },
        info: {}, // Will vary based on type
    }
}
