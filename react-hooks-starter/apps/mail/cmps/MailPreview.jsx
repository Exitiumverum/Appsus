
export function MailPreview({ mail }) {
    // console.log('mail: ', mail)

    const { name, subject, body, sentAt } = mail
    return (
        <React.Fragment>
            <div className="mail-start">
                <div className="mail-btns">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" /></svg>
                </div>
                <p className="mail-name">{name}</p>
            </div>
            <p>{subject}</p>
            <p>{body}</p>
            <p className="mail-date">{sentAt}</p>
        </React.Fragment>
    )
}