import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails }) {
    // console.log(mails)
    return (
        <section className="mail-list">
            {mails.map(mail => {
                return <ul className="mail-container">
                    <MailPreview mail={mail}/>
                    {/* {console.log(mail)} */}
                </ul>
            })}
        </section>
    )
}
