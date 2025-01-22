export function MailFilter({isFilterOpen}) {

    return (
        // <React.Fragment>
        <section className={`mail-filter-section ${isFilterOpen ? 'filter-open' : 'filter-closed'}`}>
            <div className="mail-filter-item filter-compose">Compose</div>
            <div className="mail-filter-item filter-inbox">Inbox</div>
            <div className="mail-filter-item filter-starred">Starred</div>
            <div className="mail-filter-item filter-important">Important</div>
            <div className="mail-filter-item filter-sent">Sent</div>
            <div className="mail-filter-item filter-drafts">Drafts</div>
        </section>
        // </React.Fragment>
    )
}