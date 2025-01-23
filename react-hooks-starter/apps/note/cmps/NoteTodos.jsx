export function NoteTodos({ note }) {
    return (
        <ul>
            {note.info.todos.map((todo, idx) => (
                <li key={idx}>
                    <input type="checkbox" checked={todo.done} />
                    {todo.txt}
                </li>
            ))}
        </ul>
    )
}
