export function MailSideBar() {

    function openMenuFilter(){
        
    }
    return (
        <React.Fragment>
            <div className="mail-side-bar">
                <svg onClick={openFilterMenu} xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960"  fill="#5f6368"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
            </div>
        </React.Fragment>
    )
}