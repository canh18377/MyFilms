import { UserOutlined ,LogoutOutlined} from '@ant-design/icons';
import clsx from 'clsx';
import { useContext } from 'react';
import { SharedData } from '../../../DefaultLayout';
import Styles from './pagePersional.module.scss'
import Tippy from '@tippyjs/react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';
function PagePersional() { 
    const {setIsLoged,profileInfo}=useContext(SharedData)
    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('profileInfo')
        setIsLoged(false)
        navigate('/')
    }
    return ( 
        <div>
            <Tippy
            interactive={true}
            theme='light'
            placement='bottom'
            appendTo= 'parent'
            delay={[0,200]}
            content={
            <div className={clsx(Styles.iconBackground)}>
            <div className={clsx(Styles.openProfile)}>
                  <UserOutlined/>
              <p onClick={()=>navigate('/profile')}>View Profile</p>
            </div>
            <div className={clsx(Styles.Logut)}>
            <LogoutOutlined />
             <p onClick={()=>handleLogout()}>Log Out</p>
            </div>
            </div>}>
            <Avatar
            src={profileInfo.profilePhoto.path}
              size={40} />
            </Tippy>
        </div>
     );
}

export default PagePersional;