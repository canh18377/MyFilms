import clsx from "clsx";
import Styles from './continuteNumber.module.scss'
import { Button,message } from "antd";
import { useNavigate } from "react-router-dom";
function ContinuteNumber({account,setaccount,setConfirmAccount,confirmAccount,setIsLogIn,setIsLoged,handleCloseModal}) {
    const Navigate=useNavigate()
    const HandleSubmit=(event)=>{
      event.preventDefault();
      const APIUSer="http://localhost:8080/account"
      fetch(APIUSer,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(account)

      })
       .then(response=>{
          try {
            if(!response.ok)
            {
              message.error('server bận , thử lại sau')
            }
            else return response.json()
            .then(data=>{
              if(data.Token){
                 message.success(data.message)
                 localStorage.setItem('jwtToken',data.Token)
                 Navigate('/yourhome')
                 setIsLoged(true)
                 setConfirmAccount(true)
                 handleCloseModal(false)
              }
              else{
                message.error('sai thông tin đăng nhập')
              }
            })
          } catch (error) {
            console.log(error)
          }
        })}

  return ( 
          <form onSubmit={HandleSubmit}>
            <div className={clsx(Styles.containerLogin)}>
              <h1>LogIn</h1>
            <input id="name" 
            value={account.name}
            className={clsx(Styles.account)}
            placeholder="Account" 
            onChange={(e)=>{setaccount({...account,name:e.target.value})}}/>
           
            <input id="password" 
            value={account.password}
            className={clsx(Styles.account)} 
            placeholder="password" type="password" 
             onChange={(e)=>{setaccount({...account,password:e.target.value})}}/>
             <p style={{color:'red',display:!confirmAccount?'block':'none'}}>Incorrect account or password</p>
           
            </div>
            <div className={clsx(Styles.containerButton)}>
               <Button 
            onClick={()=>setConfirmAccount(true)}
            className={clsx(Styles.button)}>
              Try again
            </Button>

            <Button 
            htmlType={'submit'}
            className={clsx(Styles.button)}
            loading={!confirmAccount}>
              LogIn
            </Button>
            </div>
            <div className={clsx(Styles.footer)}>
              <hr/>
              <p>Don’t have an account?
                  <u style={{color:'red',cursor:'pointer'}} onClick={()=>{setIsLogIn(false)}} > Sign up</u></p></div>
            </form>)
}

export default ContinuteNumber