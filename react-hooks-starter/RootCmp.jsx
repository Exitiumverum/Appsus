const { Route, Routes, Navigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
// Mail App cmps
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { MailInbox } from "./apps/mail/cmps/Inbox.jsx"
import { MailSent } from "./apps/mail/cmps/Sent.jsx"

// Note App cmps
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"


export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} >
                    <Route path="/mail/inbox" element={<MailIndex />} />
                    {/* <Route path="/mail/starred" element={<Inbox />} /> */}
                    {/* <Route path="/mail/snoozed" element={<Snoozed />} /> */}
                    {/* <Route path="/mail/important" element={<Important />} /> */}
                    <Route path="/mail/sent" element={<MailIndex />} />
                </Route>
                <Route path="/note" element={<NoteIndex />} />
            </Routes>
        </section>
    </Router>
}
