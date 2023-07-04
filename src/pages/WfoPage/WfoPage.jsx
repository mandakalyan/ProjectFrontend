import CalendarComponent from "../../components/Wfo/Wfo"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./Wfo.scss"

export const WfoPage = ()=>{
    return(
        <div className="wfo">
            <Sidebar/>
            <div className="wfo-container">
                <Navbar/>
                <CalendarComponent/>
            </div>
        </div>
    )
}