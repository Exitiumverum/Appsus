// apps/note/services/demo-data.js
export const demoNotes = [
    {
        id: 'n101',
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#fff' },
        info: { txt: 'Welcome to MissKeep!' },
    },
    {
        id: 'n102',
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#f28b82' },
        info: { txt: 'This is a colorful note!' },
    },
    {
        id: 'n103',
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#ccff90' },
        info: { txt: 'You can pin or delete notes.' },
    },
];
