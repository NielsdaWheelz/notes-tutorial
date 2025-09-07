interface NoteProps {
    content: string
}

export default function Note({content}: NoteProps) {
    return (
        <div>
            <h1>Note</h1>
            <p>{content}</p>
        </div>
    )
}