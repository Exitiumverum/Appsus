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
    }).catch(err => {
        console.error('Failed to fetch notes:', err)
        throw new Error('Failed to load notes')
    })
}

// Save a note (create or update)
function save(note) {
    if (note.id) {
        return updateNote(note)
    } else {
        return storageService.post(NOTE_KEY, note).then(() => note).catch(err => {
            console.error('Failed to save note:', err)
            throw new Error('Failed to save note')
        })
    }
}

// Remove a note
function remove(noteId) {
    return query().then(notes => {
        const updatedNotes = notes.filter(note => note.id !== noteId) // Remove note by id
        return storageService.save(NOTE_KEY, updatedNotes).then(() => noteId)
    }).catch(err => {
        console.error(`Failed to remove note with ID ${noteId}:`, err)
        throw new Error('Failed to remove note')
    })
}

// Update a specific note
function updateNote(updatedNote) {
    return query().then(notes => {
        const idx = notes.findIndex(note => note.id === updatedNote.id)
        if (idx === -1) throw new Error(`Note with ID ${updatedNote.id} not found`)
        
        const updatedNotes = [...notes]
        updatedNotes[idx] = { ...updatedNotes[idx], ...updatedNote } // Merge changes

        return storageService.save(NOTE_KEY, updatedNotes).then(() => updatedNote)
    }).catch(err => {
        console.error('Failed to update note:', err)
        throw new Error('Failed to update note')
    })
}

// Toggle the pinned state of a note
function togglePin(noteId) {
    return query().then(notes => {
        const note = notes.find(note => note.id === noteId)
        if (!note) throw new Error(`Note with ID ${noteId} not found`)

        note.isPinned = !note.isPinned
        return storageService.save(NOTE_KEY, notes).then(() => note)
    }).catch(err => {
        console.error(`Failed to toggle pin for note with ID ${noteId}:`, err)
        throw new Error('Failed to toggle pin')
    })
}

// Create an empty note template
function getEmptyNote(type = 'NoteTxt') {
    const emptyNote = {
        id: generateId(), // Generate a unique ID
        type, // Note type (e.g., NoteTxt, NoteImg)
        isPinned: false,
        style: { backgroundColor: '#ffffff' }, // Default background color
        info: getDefaultInfo(type), // Get default info based on type
    }
    return emptyNote
}

// Generate default info based on note type
function getDefaultInfo(type) {
    switch (type) {
        case 'NoteTxt':
            return { txt: '' }
        case 'NoteImg':
            return { url: '', title: 'New Image' }
        case 'NoteTodos':
            return { todos: [] }
        case 'NoteVideo':
            return { url: '', title: 'New Video' }
        default:
            return {}
    }
}

// Generate a unique ID for new notes
function generateId() {
    return '_' + Math.random().toString(36).substring(2, 9)
}
