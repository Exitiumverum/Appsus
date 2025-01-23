// mail service
import { storageService } from "../../../services/storage.service.js"

const MAILS_KEY = 'mailDB'
const loggedUser = {
    email: 'avi@gmail.com',
    fullname: 'Avi Cohen'
}
__createDemoMail()

export const mailService = {
    loggedUser
}



function __createDemoMail() {
    const mails = [{
        id: 'e101',
        createdAt: 1737533108,
        subject: 'I miss you',
        body: 'Would love to catch up with you sometime!',
        isRead: false,
        sentAt: 1737533108,
        removedAt: null,
        from: 'momo@momo.com',
        name: 'Momo',
        to: 'avi@gmail.com'
    },
    {
        id: 'e102',
        createdAt: 1737533108,
        subject: 'I miss you',
        body: 'Would love to catch up with you sometime!',
        isRead: false,
        sentAt: 1737533108,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'avi@gmail.com'
    }
    ]
    storageService.saveToStorage(MAILS_KEY, mails)
}