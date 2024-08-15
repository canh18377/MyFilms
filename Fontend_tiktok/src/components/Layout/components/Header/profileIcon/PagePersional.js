import { UserOutlined ,LogoutOutlined} from '@ant-design/icons';
import clsx from 'clsx';
import Styles from './pagePersional.module.scss'
import Tippy from '@tippyjs/react';
import { useNavigate } from 'react-router-dom';
function PagePersional() {
    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('jwtToken')
        navigate('/')
    }
    return ( 
        <div>
            <Tippy
            interactive={true}
            theme='light'
            appendTo= 'parent'
            delay={[0,200]}
            content={
            <div className={clsx(Styles.iconBackground)}>
            <div className={clsx(Styles.openProfile)}>
                  <UserOutlined/>
              <p onClick={()=>navigate('/yourprofile')}>View Profile</p>
            </div>
            <div className={clsx(Styles.Logut)}>
            <LogoutOutlined />
             <p onClick={()=>handleLogout()}>Log Out</p>
            </div>
            </div>}>
            <UserOutlined
            className={clsx(Styles.background)}
            spin={true}/>
            </Tippy>
        </div>
     );
}

export default PagePersional;