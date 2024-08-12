import { useEffect } from "react"
import axios from 'axios';
const API_KEY = '1NXpKIMVnNObhJKbNgZomY6sqAat9moHY3csuaVrkkPYD2BFrIiPt7CP'; 

function VideoFollowing({history,setVideos,contentSearch}){
    useEffect(()=>{
        const fetchVideos = async()=>{
         try {
             const response =  axios.get('https://api.pexels.com/videos/search', {
               headers: {
                 'Authorization': API_KEY
               },
               params: {
                 query:contentSearch === '' ?'dog':contentSearch,
                 per_page: 8,
                 page: 1
               }
             })
             if( (await response).data.videos.length!==0)
             {
               setVideos((await response).data.videos)
             }else{
               alert('đéo phải cái gì cũng có')
             }
           } catch (error) {
           console.error('Error fetching videos:', error);
         }
        }
        fetchVideos();
     } ,[history])
}
export default VideoFollowing