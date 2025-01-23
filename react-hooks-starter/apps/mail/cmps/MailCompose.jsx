
import { mailService } from "../services/mail.service.js";
import { storageService } from "../../../services/storage.service.js"

const { useState } = React

export function MailCompose() {

    const [to, setTo] = useState('')
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')

    const { createSentMail } = mailService

    const handleSend = () => {
        const EMAIL_DATA = { to, subject, content };
        createSentMail({...EMAIL_DATA})
        // console.log({...EMAIL_DATA})
    }

    return (
        <div className="mail-compose">
            <h3 className="compose-head">New Message</h3>
            <textarea
                className="compose-to"
                name="to"
                value={to}
                onChange={(e) => setTo(e.target.value)} // Update state on change
            >to</textarea>
            <textarea
                className="compose-subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)} // Update state on change
            >subject</textarea>
            <textarea
                className="compose-content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)} // Update state on change
            ></textarea>
            <button className="compose-send-btn" onClick={handleSend}>Send</button> {/* Attach send handler */}
        </div>
    )
}