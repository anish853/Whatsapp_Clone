import { useEffect,useState,useContext } from "react";
import { getUsers } from "../../services/api";
import { Box,makeStyles } from "@material-ui/core";
//components
import Conversation from "./other";
import { AccountContext } from "../../Context/AccountProvider";

const useStyle=makeStyles({
    component:{
        height:'81vh',
        overflow:'overlay'
    }
})

const Conversations=({text})=>{
    const classes=useStyle();
    const [users,setUsers] = useState([]);
    const {account,socket,setActiveUsers} = useContext(AccountContext);
    useEffect(()=>{
        const fetchData=async()=>{
            const data = await getUsers();
            const filterData = data.filter(users=>users.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(filterData);
        }
        fetchData();
    },[text])

    useEffect(()=>{
        socket.current.emit('addUser',account.googleId);
        socket.current.on('getUsers',users =>{
            setActiveUsers(users);
        });
    },[account]);
    return(
        <Box className={classes.component}>
            {
                users.map(users =>(
                    users.googleId !== account.googleId &&
                    <Conversation user={users}/>
                ))
            }
        </Box>
    )
}

export default Conversations;