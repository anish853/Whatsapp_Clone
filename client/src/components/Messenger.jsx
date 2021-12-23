import { AppBar, Toolbar, makeStyles, Box } from '@material-ui/core';
import React,{ useContext } from "react";
import { AccountContext } from '../Context/AccountProvider';

//components
import Login from "./account/Login";
import ChatBox from './ChatBox';

const usestyles=makeStyles({
    loginHeader:{height:200,background:'#00bfa5',boxShadow:'none'},
    component: {height: '100vh',background: '#DCDCDC'},
    header: {background: '#128C7E',height: 115,boxShadow: 'none'}
})


const Messenger=()=>{
    const classes=usestyles();
    const {account}=useContext(AccountContext);
    return(
        <>
        <AppBar className = {account ? classes.header : classes.loginHeader}>
            <Toolbar></Toolbar>
        </AppBar>
        {account ? <ChatBox/> : <Login/>}
        </>
    )
}
export default Messenger;