import {NavLink} from "react-router-dom";
import css from './header.module.scss';
import {useContext} from 'react';
import {AuthContext} from '../context';


const Header = () => {

    const{isAuth, setIsAuth} = useContext(AuthContext);
    // console.log("хедер" +isAuth);

    return(
        <header className={css.header}>
            <div className={css.imgCont}><NavLink to='/'><img src="/images/logo.jpg" alt="Логотип компании проката" width="190px"/></NavLink></div>
            <div className={css.menuNav}>
                <nav>
                    {isAuth===true?
                    <>
                        <NavLink to='/report-about' className={css.NavLink}>Собщить о краже :(</NavLink>
                        <NavLink to='/steal' className={css.NavLink}>Кражи</NavLink>
                        <NavLink to='/employees' className={css.NavLink}>Ответственные сотрудники</NavLink>
                    </>
                    : 
                    <NavLink to='/report-about' className={css.NavLink}>Собщить о краже :(</NavLink>
                    }
                </nav>
                <div>
                    {isAuth===true? 
                        <NavLink to='/' className={css.buttonLink}><button onClick={()=> {localStorage.removeItem('token'); setIsAuth(false); window.location.replace(`/`)
                        ;}}>Выйти</button></NavLink>
                        : <>
                                <NavLink to='/entrance' className={css.buttonLink}><button>Войти</button></NavLink>
                                <NavLink to='/registration' className={css.buttonLink}><button>Регистрация</button></NavLink>
                        </>
                    }
                </div>
            </div>
        </header>
    )
}

export {Header}