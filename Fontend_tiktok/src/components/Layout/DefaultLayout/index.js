import Header from "../components/Header";
import SideBar from "./SideBar";
import Styles from './defaultLayout.module.scss'
import clsx from "clsx";
import { useState,createContext } from "react";
const  SharedData=createContext()
function DefaultLayout({children}) {
  const [contentSearch,setContentSearch]=useState('')
  const [history,setHistory]=useState([])
  const [isModelOpen,setIsModelOpen]=useState(false)
  const [isLoged,setIsLoged]=useState(false)

    return (  
      <SharedData.Provider value={{
        contentSearch,
        setContentSearch,
        history,
        setHistory,
        setIsModelOpen,
        isModelOpen,
        isLoged,
        setIsLoged,

    }}>
              <div className={clsx(Styles.DefaultLayout)}>
            <Header/>
         <div className={clsx(Styles.container)}>
             <SideBar/>
             <div className={clsx(Styles.content)}> 
              {children} 
             </div>
         </div>
      </div>
      </SharedData.Provider>
    );
}

export default DefaultLayout;
export {SharedData}