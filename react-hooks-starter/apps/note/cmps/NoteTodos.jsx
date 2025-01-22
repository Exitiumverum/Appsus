export function NoteTodos({ note }) {
    return (
        <div className="note-todos">
            <h4>Todos</h4>
            <ul>
                {note.info.todos.map((todo, idx) => (
                    <li key={idx}>
                        <input type="checkbox" checked={todo.done} readOnly />
                        <span>{todo.txt}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
