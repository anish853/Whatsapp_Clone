import { useState, useContext, useEffect, useRef } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { AccountContext } from '../../Context/AccountProvider';
//components
import Footer from './Footer';
import { newMessage, getMessages } from '../../services/api';
import Message from "./Message";
const useStyles = makeStyles({
    wrapper: {
        backgroundImage: `url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'})`,
        // height: 'calc(100% - 114px)',
        backgroundSize: '50%'
    },
    footer: {
        height: '45px',
        background: '#ededed',
        // position: 'absolute',
        width: '100%',
        // bottom: 0
    },
    component: {
        height: '79.5vh',
        overflowY: 'scroll',
    },
    container: {
        padding: '1px 80px'
    }
})


const Messages = ({ person, conversation }) => {
    const classes = useStyles();

    const [messages, setMessages] = useState([]);
    const [incomingMessage, setIncomingMessage] = useState(null);
    const [value, setValue] = useState();

    const scrollRef = useRef();

    const { account, socket, newMessageFlag, setNewMessageFlag } = useContext(AccountContext);

    useEffect(() => {
        
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, []);
    
    useEffect(() => {
        const getMessageDetails = async () => {
            let response = await getMessages(conversation._id);
            setMessages(response.data);
        }
        getMessageDetails();
    }, [conversation?._id, person._id, newMessageFlag]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: "smooth" })
    }, [messages]);

    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.sender) && 
            setMessages((prev) => [...prev, incomingMessage]);
        
    }, [incomingMessage, conversation]);

    const receiverId = conversation?.members?.find(member => member !== account.googleId);
    
    const sendText = async (e) => {
        let code = e.keyCode || e.which;
        if(!value) return;

        if(code === 13) { 
            let message = {
                sender: account.googleId,
                conversationId: conversation._id,
                text: value
            };

            socket.current.emit('sendMessage', {
                senderId: account.googleId,
                receiverId,
                text: value
            })

            await newMessage(message);

            setValue('');
            setNewMessageFlag(prev => !prev);
        } 
    }
    return (
        <Box className={classes.wrapper}>
            <Box className={classes.component}>
                {
                    messages && messages.map(message => (
                        <Box className={classes.container} ref={scrollRef}>
                            <Message message={message} />
                        </Box>
                    ))
                }
            </Box>
            <Footer sendText={sendText} value={value} setValue={setValue} />
        </Box>
    )
}

export default Messages;