import { Box, Typography, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AccountContext } from "../../Context/AccountProvider";
import { UserContext } from "../../Context/UserProvider";
import { getConversation, setConversation } from "../../services/api.js";
const useStyles = makeStyles({
    component: {
        height: 40,
        display: 'flex',
        padding: '13px 0',
        cursor: 'pointer'
    },
    displayPicture: {
        width: 50,
        height: 50,
        objectFit: 'cover',
        borderRadius: '50%',
        padding: '0 14px'
    },
    container: {
        display: 'flex'
    },
    timestamp: {
        fontSize: 10,
        marginLeft: 'auto',
        color: '#00000099',
        marginRight: 20
    },
    text: {
        display: 'block',
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 14
    }
})

const Conversation = ({ user }) => {
    const classes = useStyles();
    const { account,newMessageFlag } = useContext(AccountContext);
    const {setPerson}=useContext(UserContext);
    const [message,setMessage] = useState({});
    useEffect(() => {
        const getConversationMessage = async() => {
            const data = await getConversation({ sender: account.googleId, receiver: user.googleId });
            setMessage({ text: data.message, timestamp: data.updatedAt });
        }
        getConversationMessage();
    }, [newMessageFlag]);

    const setUser = async () => {
        setPerson(user);
        await setConversation({ senderId: account.googleId, receiverId: user.googleId });
    }
    return (
        <Box className={classes.component} onClick={() => setUser()}>
            <Box>
                <img src={user.imageUrl} className={classes.displayPicture} />
            </Box>
            <Box style={{width:'100%'}}>
                <Box style={{display:'flex'}}> 
                    <Typography>{user.name}</Typography>
                    {
                        message.text &&
                        <Typography className={classes.timestamp}>
                            {new Date(message.timestamp).getHours()}:{new Date(message.timestamp).getMinutes()}
                        </Typography>
                    }
                </Box>
                <Box>
                    <Typography className={classes.text}>{message.text}</Typography>
                </Box>
            </Box>
        </Box>
    )
}
export default Conversation;