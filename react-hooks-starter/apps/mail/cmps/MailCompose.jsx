
export function MailCompose(){
    return (
        <div className="mail-compose">
            <h3 className="compose-head">New Message</h3>
            <textarea className="compose-to" name="to" id="">to</textarea>
            <textarea className="compose-subject" name="subject" id="">subject</textarea>
            <textarea className="compose-content" name="content" id=""></textarea>
            <button className="compose-send-btn">Send</button>
        </div>
    )
}