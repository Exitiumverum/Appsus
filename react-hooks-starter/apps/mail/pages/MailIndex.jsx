import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { storageService } from '../../../services/async-storage.service.js'
import { MailSideBar } from '../cmps/MailSideBar.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'

const { useState, useEffect } = React

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [isComposeOpen, setCompose] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(true)

    useEffect(() => {
        document.body.classList.add('no-overflow') // Add class when component mounts
        loadMails()

        return () => {
            document.body.classList.remove('no-overflow') // Remove class when component unmounts
        }
    }, [])

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

    function onOpenCompose(){
        setCompose (prevState => !prevState)
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <MailSideBar onOpenFilter={onOpenFilter} />
            <div className='mail-header-body'>
                <MailHeader />
                <div className="mail-body">
                    <MailFilter isFilterOpen={isFilterOpen} isComposeOpen={isComposeOpen} onOpenCompose={onOpenCompose} />
                    <React.Fragment>

                        <MailList mails={mails} isFilterOpen={isFilterOpen} />
                        {isComposeOpen && <MailCompose />}
                    </React.Fragment>
                </div>
            </div>
        </section>
    )
}

