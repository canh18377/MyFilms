import clsx from "clsx";
import Styles from './formSignUp.module.scss'
import { Button } from "antd";
import { useState } from "react";
function SignUp({setIsLogIn}) {
    const[account,setAccount]=useState({name:'',password:''})
    const handleSignUp=(event)=>{
            event.preventDefault();
           fetch('http://localhost:8000/user',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(account)
        })
           .then((response)=>{alert('successfull')
            return response.json() }) 

           .then((data) => {
            setAccount({name:'',password:''})
            console.log(data)
        }) 
           .catch(error => console.error('Error:', error))}
    return (  
        <div className={clsx(Styles.formSignUp)}>
        <h1>SignUp</h1>
         <form onSubmit={handleSignUp}>
        <div className={clsx(Styles.input)} >
        <input
        value={account.name}
        onChange={e=>setAccount({...account,name:e.target.value})}
        className={clsx(Styles.inputName)}
        placeholder="Account"
        />
        <input
        value={account.password}
        type="password"
        onChange={e=>setAccount({...account,password:e.target.value})}
        className={clsx(Styles.inputPassword)}
        placeholder="Password"
        />
        </div>
       <div className={clsx(Styles.buttonForm)}>
          <Button 
        className={clsx(Styles.buttonSignUP)}
        htmlType="submit"
        type="primary"
        >Sign UP</Button>
       </div>
        <div>
            <hr/>
            <p>Do have an account?<u onClick={()=>setIsLogIn(true)} style={{color:'red',cursor:'pointer'}}> Log In</u></p>
        </div>
        </form> 
        </div>
    )

}
export default SignUp;