import { storageService } from '../../../services/async-storage.service.js';
import { demoNotes } from './demo-data.js';

const NOTE_KEY = 'noteDB';

export const noteService = {
    query,
    save,
    remove,
    getEmptyNote,
};

// Fetch notes (from storage or create default ones)
function query() {
    return storageService.query(NOTE_KEY).then(notes => {
        if (!notes.length) {
            storageService.postMany(NOTE_KEY, demoNotes); // Use demo notes
            return demoNotes;
        }
        return notes;
    });
}

// Save a note
function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note);
    } else {
        return storageService.post(NOTE_KEY, note);
    }
}

// Remove a note
function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId);
}

// Create an empty note template
function getEmptyNote() {
    return {
        id: '',
        type: 'NoteTxt', // Default type
        isPinned: false,
        style: { backgroundColor: '#fff' },
        info: {} // Will vary based on type
    }
}

