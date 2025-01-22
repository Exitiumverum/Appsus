import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails , isFilterOpen}) {
    return (
        <ul className={`mail-list ${isFilterOpen ? 'filter-open' : ''} `} >
            {mails.map(mail => {
                return <li className="mail" key={mail.id}>
                    <MailPreview mail={mail} />
                </li>

            })}
        </ul >
    )
}
