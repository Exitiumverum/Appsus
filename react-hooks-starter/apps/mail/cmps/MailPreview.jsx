
export function MailPreview({ mail }) {
    console.log('mail: ', mail)

    const { from, subject, body, sentAt } = mail
    return (
        <li className="mail">
            <div>
                <p>{from}</p>
                <p>{subject}</p>
                <p>{body}</p>
                <p>{sentAt}</p>
            </div>
        </li>
    )
}