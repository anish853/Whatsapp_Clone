import { useEffect, useState,useContext } from 'react';
import { Box } from '@material-ui/core';
// components
import {AccountContext} from '../../Context/AccountProvider';
import { getConversation } from '../../services/api';
import { UserContext } from '../../Context/UserProvider';
import ChatHeader from './ChatHeader';
import Messages from './Messages';
 
const Chat=()=>{
    const{person} = useContext(UserContext);
    const {account} = useContext(AccountContext);
    const [conversation,setConversation]=useState({});
    useEffect(()=>{
        const getConversationDetails = async()=>{
            let data = await getConversation({sender: account.googleId,receiver:person.googleId})
            setConversation(data);
        }
        getConversationDetails();

    },[person.googleId])
    return(
        <Box>
            <ChatHeader/>
            <Messages conversation={conversation} person={person}/>
        </Box>
    )
}

export default Chat;