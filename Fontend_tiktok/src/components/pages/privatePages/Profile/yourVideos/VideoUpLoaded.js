import { useEffect,useContext, useState } from "react";
import { SharedData } from "../../../../Layout/DefaultLayout";
import { message } from "antd";
import clsx from "clsx";
import Styles from './videoProfile.module.scss'

function VideoUpLoaded() {
    const [videos,setVideos]= useState([])
    const {profileInfo}=useContext(SharedData)
    useEffect(()=>{
     fetch(`http://localhost:8080/profile/videos/${profileInfo.author}`,{
      method:"GET",  
      headers :{'Content-type':'application/json'},
        
     })
     .then((res)=>{
    if(!res.ok)
    {
        message.error('server bận')
    }
    else return res.json()
     })
     .then(data=>{
        setVideos(data)
        console.log('video',data)
     })
     .catch(err=>{
        message.error('có lỗi xảy ra ')
        console.log(err)
     })

    },[])
    return (  
      <div style={{display:'flex',flexWrap:'wrap'}}>
       {
        videos.map((video,index)=>{
            return (
              <div key={index} className={clsx(Styles.containerVideo)}>
                  <video src={video.path}  className={clsx(Styles.videoProfile)}/>
              </div>
            )
        })
       }
      </div>
    );
}

export default VideoUpLoaded;