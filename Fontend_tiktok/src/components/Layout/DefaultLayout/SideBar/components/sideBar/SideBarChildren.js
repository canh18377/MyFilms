import Styles from '../../sideBar.module.scss'
import clsx from 'clsx';
function SideBarChildren(prop){
    return(
        <div className={clsx(Styles.page)}
                onClick={()=>prop.handle()} >
            <img className={clsx(Styles.icon)} 
            src= {prop.img}/>
            <span className={clsx(Styles.content)}>{prop.content}</span>
           </div>
    )
}
export default SideBarChildren