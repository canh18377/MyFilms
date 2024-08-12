import { useEffect } from "react"
import axios from 'axios';
const API_KEY = '1NXpKIMVnNObhJKbNgZomY6sqAat9moHY3csuaVrkkPYD2BFrIiPt7CP'; 

function VideoHome({history,setVideos,contentSearch}){
    useEffect(()=>{
        const fetchVideos = async()=>{
        const response= axios.get("https://api.pexels.com/videos/search",{
          headers:{
          'Authorization':API_KEY
          },
        params:{
          query:contentSearch===''?'hot girl':contentSearch,
          per_page:4,
          page:1

        }}
      )
      .then((response)=>{
        setVideos(response.data.videos)
      })
    }
       
        fetchVideos();
     } ,[history])
}
export default VideoHome