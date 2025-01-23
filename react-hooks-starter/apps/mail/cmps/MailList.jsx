import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails , isFilterOpen, filterBy}) {
    console.log(isFilterOpen);
    

    const sortedMails = mails.sort((a, b) => b.sentAt - a.sentAt); // Sort mails by sentAt in descending order


    return (
        <ul className='mail-list scorllable'>
            {sortedMails.map(mail => {
                return <li className="mail" key={mail.id}>
                    <MailPreview mail={mail} />
                </li>

            })}
        </ul >
    )
}
