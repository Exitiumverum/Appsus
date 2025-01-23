export function NoteVideo({ note }) {
    return (
        <iframe
            width="100%"
            height="250"
            src={note.info.url}
            title={note.info.title || 'Video Note'}
            allowFullScreen
        ></iframe>
    )
}
