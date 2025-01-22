export function NoteImg({ note }) {
    console.log('note:', note)
    return (
        <div className="note-img">
            <img src={note.info.url} alt={note.info.title} />
            <h4>{note.info.title}</h4>
        </div>
    )
}
