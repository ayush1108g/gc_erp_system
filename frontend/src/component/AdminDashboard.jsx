import React,{useState} from "react";
import classes from "./admindashboard.module.css"
import Navbar from "./Navbar/Navbar"
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const data = [
    {
        "announcement": "Important Announcement: Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
    },
    {
        "announcement": "Scheduled Maintenance: Aenean mattis massa id risus fermentum volutpat. Sed eu arcu nisi. Donec bibendum urna vel efficitur congue. Curabitur convallis lacus at neque ultrices consectetur. "
    },
    {
        "announcement": "Holiday Notice: Ut consectetur euismod magna, nec tempor quam sollicitudin eu. "
    },
    {
        "announcement": "New Feature Release: Pellentesque pretium lectus vitae ex sollicitudin vehicula. Mauris fermentum "
    },
    {
        "announcement": "Upcoming Event: Team Building - Integer finibus, quam quis fermentum vehicula, justo libero euismod elit, sed rhoncus lorem nisl nec quam. Curabitur ut lorem a dolor facilisis vestibulum. Mauris at arcu ultricies, dictum orci eget, fermentum neque. (Posted by Event Planning Committee on 2024-04-10)"
    }
]

const AdminDashBoard = ()=>{
    const [isSidebarOpen,setIsSideBarOpen] = useState(true);

    const handleSidebar = ()=>{
        setIsSideBarOpen(!isSidebarOpen);
    }

    return (<div className={classes.body}>
    <div className={classes.navbar}
    style={{
        width:isSidebarOpen ? '200px':'20px'
    }}
    >
        <Navbar className={classes.navbar2}
            style={{
                width: isSidebarOpen ? '200px' :'0px',
                display: isSidebarOpen ? 'block':'none'
            }}
        />
        <div className={classes.icon} 
        style={{
            left:isSidebarOpen ? '203px' :'5px'
        }}  
        onClick={handleSidebar}
        >
       {isSidebarOpen && <MdArrowBackIosNew />}
       {!isSidebarOpen && <MdArrowForwardIos />}
        </div>
    </div>
        <div className={classes.content}
        style={{
            width: isSidebarOpen ? '87vw' :'100vw'
        }}
        >
            <h1 className={classes.title}>Admin Dashboard</h1>
            <div className={classes.grandParent}>
                <div className={classes.parent}>
                <div className={classes.recent}>
                       <h3 className={classes.recenttitle}>Recent Updates</h3>
                       <ul>
                       {
                         data.map((ele,ind)=>{
                            return(<li className={classes.recentlist}>{ele.announcement}</li>)
                         })
                       }
                       </ul>
                  </div>
                  <div className={classes.box1}>

                  </div>
                  <div className={classes.box1} >

                  </div>
               
                </div>
                <div className={classes.parent1}>
                    <div>
                        Card1
                    </div>
                    <div>
                        Card2
                    </div>
                    <div>
                        Card3
                    </div>
                    <div>
                        Card4
                    </div>
                    <div>
                        Card5
                    </div>
                    <div>
                        Card6
                    </div>
                </div>
                
            </div>
        </div>
    </div>)
}


export default AdminDashBoard 