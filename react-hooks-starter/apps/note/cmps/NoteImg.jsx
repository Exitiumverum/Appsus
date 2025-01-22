export function NoteImg({ note }) {
    console.log('note:', note)
    return (
        <div className="note-img">
            {note.info.url ? (
                <img src={note.info.url} alt={note.info.title || 'Image Note'} />
            ) : (
                <p>No image available</p>
            )}
        </div>
    )
}
