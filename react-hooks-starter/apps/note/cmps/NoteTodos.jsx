export function NoteTodos({ note, onUpdateNote }) {
    function onToggleTodo(idx) {
        const updatedTodos = note.info.todos.map((todo, i) =>
            i === idx ? { ...todo, done: !todo.done } : todo
        )
        const updatedNote = { ...note, info: { ...note.info, todos: updatedTodos } }
        onUpdateNote(updatedNote)
    }

    function onDeleteTodo(idx) {
        const updatedTodos = note.info.todos.filter((_, i) => i !== idx)
        const updatedNote = { ...note, info: { ...note.info, todos: updatedTodos } }
        onUpdateNote(updatedNote)
    }

    return (
        <ul>
            {note.info.todos.map((todo, idx) => (
                <li key={idx}>
                    <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => onToggleTodo(idx)}
                    />
                    <span>{todo.txt}</span>
                    <button onClick={() => onDeleteTodo(idx)}>🗑️</button>
                </li>
            ))}
        </ul>
    )
}
