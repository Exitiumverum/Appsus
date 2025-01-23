export function NoteImg({ note }) {
    return <img src={note.info.url} alt={note.info.title || 'Image Note'} />
}
