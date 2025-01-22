import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails }) {
    // console.log(mails)
    return (
        // <section className="mail-list">
        <ul className="mail-list">
            {mails.map(mail => {
                return <li className="mail" key={mail.id}>
                    <MailPreview mail={mail} />
                    {/* {console.log(mail)} */}
                </li>

            })}
        </ul >
        // </section>
    )
}
