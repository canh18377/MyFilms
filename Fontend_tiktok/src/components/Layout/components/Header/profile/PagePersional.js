import { UserOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import Styles from './pagePersional.module.scss'
import Tippy from '@tippyjs/react';
import { useNavigate } from 'react-router-dom';
function PagePersional() {
    const navigate=useNavigate()
    return ( 
        <div>
            <Tippy
            interactive={true}
            theme='light'
            appendTo= 'parent'
            delay={[0,1000]}
            content={
                <div 
                onClick={()=>navigate('/profile')}
                className={clsx(Styles.viewProfile)}>
             <UserOutlined/>
             <p>View Profile</p>
                </div>
            }
            >
            <UserOutlined
            className={clsx(Styles.background)}
            spin={true}/>
            </Tippy>
        </div>
     );
}

export default PagePersional;