import Styles from '../../video.module.scss'
import clsx from 'clsx';
import {useState ,useContext} from 'react';
import VideoFollowing from '../../video/VideoFollowing';
import { SharedData } from '../../../Layout/DefaultLayout';
import { HeartOutlined } from '@ant-design/icons';
function Following() {
  const[selected,setSelected]=useState([])
    const [videos,setVideos]= useState([])
    const {history,contentSearch} = useContext(SharedData)
   const handleClickTym=(id)=>{
    setSelected(prev=>{
      if(prev.includes(id))
      {
          return prev.filter((value)=>{
            return id !==value
          })
      }
      else return [...prev,id]
    })
  }
    return ( 
    <div className={clsx(Styles.changeContent)}>
      <VideoFollowing
   history={history}
   setVideos={setVideos}
   contentSearch={contentSearch}/>
      {
        
        videos.map((video)=>{
        return (
          <div className={clsx(Styles.containerVideoIcon)}  
          key={video.id}> 
            <video
          className={clsx(Styles.video)}
          controls
          src={video.video_files[0].link}
          autoPlay
          muted
          />
              <div className={clsx(Styles.containerIcon)}>
                    <HeartOutlined 
                    className={clsx(Styles.iconHeart)}
                      style={{color:selected.includes(video.id)&&'red',fontSize:'30px'}}
                      onClick={()=>handleClickTym(video.id)} />
              </div>
        </div>
        )
        })
      }
    </div>    
    
    )

     
}

export default Following;