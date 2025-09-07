interface NoteComponentProps {
    content: string
}

export default function NoteComponent({content}: NoteComponentProps) {
    return (
        <div>
            <p>{content}</p>
            <hr />
        </div>
    )
}