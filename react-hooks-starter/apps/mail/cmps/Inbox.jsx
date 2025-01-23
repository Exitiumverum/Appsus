import { mailService } from "../services/mail.service.js"
import { MailList } from "./MailList.jsx"

export function MailInbox({mails, isFilterOpen}) {

    const { fullname, email } = mailService.loggedUser
// console.log(mails);
    
// console.log(isFilterOpen)
    const INBOX_BTN = document.querySelector('.mail-filter-item.filter-inbox')
    
    
    let filteredMails = mails.filter((mail) => mail.from !== email)
    console.log('Inbox: ', filteredMails)
    console.log('Inbox: ', email);
    
    // console.log(INBOX_BTN);

    return (
        <MailList mails={filteredMails} isFilterOpen={isFilterOpen} />
    )
}