import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { storageService } from '../../../services/async-storage.service.js'
import { MailSideBar } from '../cmps/MailSideBar.jsx'

const { useState, useEffect } = React

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [isFilterOpen, setIsFilterOpen] = useState(true)

    useEffect(() => {
        loadMails()
    },)

    function loadMails() {
        // console.log(mails)
        storageService.query('mailDB')
            .then(setMails)
            .catch((err) => {
                console.log('err: ', err);

            })
    }

    function onOpenFilter(){
        console.log('pressed')
        setIsFilterOpen(prevState => !prevState)
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <MailSideBar onOpenFilter={onOpenFilter} />
            <div className='mail-header-body'>
                <MailHeader />
                <div className="mail-body">
                    <MailFilter isFilterOpen={isFilterOpen}/>
                    <React.Fragment>

                        <MailList mails={mails} isFilterOpen={isFilterOpen} />
                    </React.Fragment>
                </div>
            </div>
        </section>
    )
}

