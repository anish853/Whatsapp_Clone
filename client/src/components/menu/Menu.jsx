//components
import Header from "./Header";
import Search from "./Serach";
import Conversations from "./Conversation";
import { useState } from "react";
const Menu = () => {
    const [text,setText] = useState('');
    return (
        <>
            <Header />
            <Search  setText={setText}/>
            <Conversations text={text}/>
        </>
    )
}

export default Menu;

