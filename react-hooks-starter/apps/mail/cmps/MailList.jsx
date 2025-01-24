import { MailPreview } from "./MailPreview.jsx"
const { Link, useSearchParams, Navigate } = ReactRouterDOM
import { useNavigate } from "react-router-dom"; // Add this import


export function MailList({ mails, isFilterOpen, filterBy }) {
    // console.log(isFilterOpen);

    // const navigate = useNavigate()

    const sortedMails = mails.sort((a, b) => b.sentAt - a.sentAt); // Sort mails by sentAt in descending order

    function handleClick(element) {
        // const MAIL = { ...element }.currentTarget.className
        const MAIL = { ...element }.currentTarget.dataset.mailId
        // element.classList.add('isClicked')
        // navigate(`/mail/details${MAIL}`)

        if (MAIL.includes('isCLicked')) return
        document.querySelector(`[data-mail-id="${MAIL}"]`).classList.add('isClicked')
        console.log(MAIL);

    }

    return (
        <ul className='mail-list scorllable'>
            {sortedMails.map(mail => {
                return <li data-mail-id={mail.id} onClick={(element) => handleClick(element)} className="mail" key={mail.id}>
                    <MailPreview mail={mail} />
                </li>

            })}
        </ul >
    )
}
