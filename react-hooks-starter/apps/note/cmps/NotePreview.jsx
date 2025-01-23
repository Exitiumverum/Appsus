import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVideo } from './NoteVideo.jsx'

export function NotePreview({ note }) {
    const renderContent = () => {
        if (note.type === 'NoteTxt') return <NoteTxt note={note} />
        if (note.type === 'NoteImg') return <NoteImg note={note} />
        if (note.type === 'NoteTodos') return <NoteTodos note={note} />
        if (note.type === 'NoteVideo') return <NoteVideo note={note} />
        return <p>Unsupported note type</p>
    }

    return (
        <article style={{ backgroundColor: note.style.backgroundColor }}>
            {renderContent()}
        </article>
    )
}
