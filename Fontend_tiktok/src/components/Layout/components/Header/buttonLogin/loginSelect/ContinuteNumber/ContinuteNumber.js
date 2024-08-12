import clsx from "clsx";
import Styles from './continuteNumber.module.scss'
import { Button } from "antd";
function ContinuteNumber({account,setaccount,setConfilmAccount,confilmAccount,setIsLogIn,setIsLoged,handleCloseModal}) {
    const HandleSubmit=(event)=>{
      event.preventDefault();
      const APIUSer="http://localhost:8000/user"
      fetch(APIUSer)
       .then((response=>{return response.json()}))
       .then(users=>{
        setConfilmAccount(true)
        const confilm=users.some(user=>{return user.name===account.name&&user.password===account.password})
       if(!confilm)
       {
        setConfilmAccount(false)
       }else{
        setIsLoged(true)
        handleCloseModal()
       }
      })
      .catch(err=>{console.log(err)})
    }  
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
             <p style={{color:'red',display:!confilmAccount?'block':'none'}}>Incorrect account or password</p>
           
            </div>
            <div className={clsx(Styles.containerButton)}>
               <Button 
            onClick={()=>setConfilmAccount(true)}
            className={clsx(Styles.button)}>
              Try again
            </Button>

            <Button 
            htmlType={'submit'}
            className={clsx(Styles.button)}
            loading={!confilmAccount}>
              LogIn
            </Button>
            </div>
            <div className={clsx(Styles.footer)}>
              <hr/>
              <p>Don’t have an account?
                  <u style={{color:'red',cursor:'pointer'}} onClick={()=>{setIsLogIn(false)}} > Sign up</u></p></div>
            </form>)
}

export default ContinuteNumber;