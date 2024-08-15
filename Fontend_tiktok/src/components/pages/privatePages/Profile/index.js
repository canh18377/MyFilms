import { message } from "antd";
import { useEffect, useState } from "react";
import clsx from 'clsx'
import Styles from './profile.module.scss'
function Profile() {
    const [dataProfile,setDataProfile]=useState('')
    const Token = localStorage.getItem('jwtToken')
   useEffect(()=>{
     fetch("http://localhost:8080/profile",{
        method:"GET",
        headers:{
           "Authorization": ` ${Token}`,
           'Content-type':'application/json'
         }
    })
     .then(res=>{
        if(!res.ok)
        {
            message.error("server bận")
        }
        else{
            return res.json()
        }})
        .then((data)=>{setDataProfile(data)})

   },[])
    return ( 
        <div>
            <div>
                <h1>heelo {dataProfile}</h1>
            </div>
            <div>

            </div>
        </div>
     )
}

export default Profile;