import { useState } from "react"
import { Modal,Button,notification } from 'antd';
import clsx from "clsx";
import Styles from './buttonlogin.module.scss'
import Select from "./loginSelect/Select";
import ContinuteNumber from "./loginSelect/ContinuteNumber/ContinuteNumber";
import SignUp from "./formSignUp/SignUp";
import PagePersional from "../profile/PagePersional";
function ButtonLogIn({isLoged,setIsLoged,isModelOpen,setIsModelOpen}){
    const [isOpenLogIn,setIsOpenLogIn]=useState(false)
    const [account,setaccount]=useState({name:'',password:''})
    const [confirmAccount,setConfirmAccount]=useState(true)
    const [isLogIn,setIsLogIn]=useState(true)
    const handleCloseModal =()=>{
      setIsOpenLogIn(false)
      setIsModelOpen(false)
      notification.success({
        description:'welcom to tiktok',
        duration:2.5,
        showProgress:true,
        placement:"topRight",
       })
    }
    return(
     <div>
          <div>
          <Modal 
            centered
            width={'450px'}
            onCancel={()=>setIsModelOpen(false)}
            open={isModelOpen}
            footer={null} >
     <div className={clsx(Styles.contentLogIn)}>
      <div>
        <h1>Log in to TikTok</h1>
        </div>
        <div className={clsx(Styles.selects)}>
          
       <Select
         onclick={()=>setIsOpenLogIn(true)}
         url="https://th.bing.com/th/id/OIP.wsWs8WcLQEFtdN_yZ5uQvwHaGc?w=186&h=162&c=7&r=0&o=5&dpr=1.5&pid=1.7"
         content='UsePhone/Email/Username'
       />
            <Select
         onclick={()=>setIsOpenLogIn(true)}
         url="https://th.bing.com/th/id/OIP.wsWs8WcLQEFtdN_yZ5uQvwHaGc?w=186&h=162&c=7&r=0&o=5&dpr=1.5&pid=1.7"
         content='UsePhone/Email/Username'
       />       <Select
         onclick={()=>setIsOpenLogIn(true)}
         url="https://th.bing.com/th/id/OIP.wsWs8WcLQEFtdN_yZ5uQvwHaGc?w=186&h=162&c=7&r=0&o=5&dpr=1.5&pid=1.7"
         content='UsePhone/Email/Username'
       />       <Select
         onclick={()=>setIsOpenLogIn(true)}
         url="https://th.bing.com/th/id/OIP.wsWs8WcLQEFtdN_yZ5uQvwHaGc?w=186&h=162&c=7&r=0&o=5&dpr=1.5&pid=1.7"
         content='UsePhone/Email/Username'
       />       <Select
         onclick={()=>setIsOpenLogIn(true)}
         url="https://th.bing.com/th/id/OIP.wsWs8WcLQEFtdN_yZ5uQvwHaGc?w=186&h=162&c=7&r=0&o=5&dpr=1.5&pid=1.7"
         content='UsePhone/Email/Username'
       />       <Select
         onclick={()=>setIsOpenLogIn(true)}
         url="https://th.bing.com/th/id/OIP.wsWs8WcLQEFtdN_yZ5uQvwHaGc?w=186&h=162&c=7&r=0&o=5&dpr=1.5&pid=1.7"
         content='UsePhone/Email/Username'
       />
      </div>
      <footer>
        <p>
        By continuing with an account located in 
        Vietnam, you agree to our Terms of Service and acknowledge
         that you have read our Privacy Policy.
        </p>
      </footer>
      <hr/>
      Don’t have an account?<a style={{color:'red'}}> Sign up</a>
       </div>
    </Modal>
     <Modal
            centered
            width={'450px'}
            onCancel={()=>setIsOpenLogIn(false)}
            open={isOpenLogIn}
            footer={null}>
              
          {isLogIn? <ContinuteNumber 
          handleCloseModal={handleCloseModal}
          setIsLoged={setIsLoged}
           account={account}
           setaccount={setaccount}
           confirmAccount={confirmAccount}
           setConfirmAccount={setConfirmAccount}
           setIsLogIn={setIsLogIn}/> :<SignUp setIsLogIn={setIsLogIn}/>}
  
          </Modal>
          </div>
           {isLoged?<PagePersional/> :<Button
            onClick={()=>setIsModelOpen(true)            }
             className={clsx(Styles.logIn)}>
                Đăng Nhập</Button>}
                
        </div>
    )
}
export default ButtonLogIn