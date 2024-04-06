import React, { useEffect, useRef, useState } from 'react'
import "../Cssfiles/Messenger.css"
import { Link, useLocation } from 'react-router-dom'
import Conversations from './Conversations'
import Message from './Message'
import Charonline from './Charonline'
import { useDispatch, useSelector } from "react-redux";
import { addpostid, addtoken } from "../Store/Slice/Userslice";
import  axios  from 'axios'
const Messenger = () => {
    const [conversations,setconversations]=useState([])
    const [currentchat,setcurrentchat]=useState(null)
    const [message,setmessage]=useState([])
    const [newmsg,setnewmsg]=useState(' ')
    const location=useLocation()
    const dispatch=useDispatch()
    const scroll=useRef()
    let token=localStorage.getItem("token")
    dispatch(addtoken(token))
    const _id=useSelector(state=>state.userdata._id)
    const handleconversations=async()=>{
        const res=await axios.get(`http://localhost:8080/api/v4/getconversaton/${_id}`).catch((err)=>console.log(err))
        // console.log(res.data.conversation)
        return  res.data.conversation
    }
    useEffect(()=>{
        
        handleconversations().then((data)=>setconversations(data))
    },[])
    useEffect(()=>{
        const getmessage=async()=>{
            let res=await axios.get(`http://localhost:8080/api/v5/getmsg/${currentchat._id}`).catch((err)=>console.log(err))
            return res.data.messages
        }
        getmessage().then((data)=>setmessage(data)).catch((err)=>console.log(err))
    },[currentchat])
    console.log(message)
    const handlesubmit=async(e)=>{
        e.preventDefault()
        const messages={
            sender:_id,
            text:newmsg,
            conversationid:currentchat._id
        };
        const postmsg=await axios.post(`http://localhost:8080/api/v5/sendmessage`,messages).catch((err)=>console.log(err))
        const data=postmsg.data.savedmessage
        setmessage([...message,data])
        setnewmsg('')
    }
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"})
    },[message])
  return (
    <div className='messenger'>
        <div className='chatmenu'>
            <div className="chatmenuwapper">
                <input placeholder='search for a friend' className='chatmenusearch'/>
                {
                   conversations.map(c=>(
                    <div onClick={()=>setcurrentchat(c)}>
                        <Conversations conversation={c} currentuser={_id}/>
                    </div>
                    ))
                }
                </div>
        </div>
        <div className='chatbox'>
            <div className="chatboxwapper">
               { currentchat?<><div className="chatboxtop">
                    
                    {
                        message.map(m=>(
                            <div ref={scroll}>
                                <Message message={m} own={m.sender==_id}/>
                        </div>
                        ))
                    }
                    </div>
                    <div className="chatboxbottom">
                    <textarea onChange={(e)=>setnewmsg(e.target.value)} value={newmsg} className='chatboxinput' placeholder='Write here'>

                    </textarea>
                    <button className='chatboxsubmit' onClick={handlesubmit}>Send</button>
                </div></>:<div className='Noconversations'>"Open a new conversation"</div>
                }
               
            </div>
        </div>
        <div className='chatonline'>
            <div className="chatonlinewapper">
                <Charonline/>
            </div>
        </div>
    </div>
  )
}

export default Messenger