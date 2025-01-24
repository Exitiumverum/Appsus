import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { storageService } from '../../../services/async-storage.service.js'
import { MailSideBar } from '../cmps/MailSideBar.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailInbox } from '../cmps/Inbox.jsx'
import { MailSent } from '../cmps/Sent.jsx'
import { MailStarred } from '../cmps/Starred.jsx'
import { MailDeatails } from '../cmps/MailDeatails.jsx'

const { Route, Routes, Navigate, useLocation } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter



const { useState, useEffect } = React

export function MailIndex() {
    const LOCATION = useLocation().pathname


    const [mails, setMails] = useState(null)
    const [isComposeOpen, setCompose] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(true)
    // const [filterBy, setFilterBy] = useState(carService.getFilterFromSearchParams(searchParams))


    useEffect(() => {
        // console.log('filterBy: ', filterBy)
        // console.log('running useEffect');
        
        document.body.classList.add('no-overflow') // Add class when component mounts
        loadMails()

        return () => {
            document.body.classList.remove('no-overflow') // Remove class when component unmounts
        }
    }, [LOCATION, isFilterOpen])

    function loadMails() {
        // console.log(mails)
        storageService.query('mailDB')
            .then(setMails)
            .catch((err) => {
                console.log('err: ', err);

            })
    }

    function onOpenFilter() {
        console.log('pressed')
        // setIsFilterOpen(prevState => !prevState)
        console.log(isFilterOpen);
    }

    function onOpenCompose() {
        setCompose(prevState => !prevState)
    }

    

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <MailSideBar isFilterOpen={isFilterOpen} onOpenFilter={() => onOpenFilter} />
            <div className='mail-header-body'>
                <MailHeader />
                <div className="mail-body">
                    <MailFilter isFilterOpen={isFilterOpen} isComposeOpen={isComposeOpen} onOpenCompose={onOpenCompose} />
                    <React.Fragment>
                        {(() => {
                            switch(LOCATION) {
                                case '/mail/inbox':
                                    return <MailInbox mails={mails} isFilterOpen={isFilterOpen}/>
                                case '/mail/sent':
                                    return <MailSent mails={mails} isFilterOpen={isFilterOpen}/>
                                case '/mail/starred':
                                    return <MailStarred mails={mails} isFilterOpen={isFilterOpen}/>
                                case '/mail/detailed:mailId':
                                    return <MailDeatails />
                                default:
                                    return <MailInbox mails={mails} isFilterOpen={isFilterOpen} />
                            }
                        })()}
                        {isComposeOpen && <MailCompose />}
                    </React.Fragment>
                </div>
            </div>
        </section>
    )
}

