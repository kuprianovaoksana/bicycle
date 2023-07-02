import axios from "axios";
import css from "./steal.module.scss";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';



const Steal = () => {

    const [message, setMessage] = useState("");
    const [data, setData] = useState("");
    let navigate = useNavigate();


    useEffect(()=>{

            const getData = async () => {

            console.log("получение данных");

            const result = await 

                axios
                .get ('https://sf-final-project-be.herokuapp.com/api/cases/',
                {
                    headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then ((response) => {
                    !data ?         
                    setData(response.data.data)
                    : console.log("");
                })
                .catch((error) => {
                    if ( error.response.status === 401 )
                    {
                        // window.location.replace(`/entrance`)
                        navigate(`/entrance`);
                    }
                    else {
                        setMessage(error.response.data.message);
                    }
                });
            }

            getData();

    });



    async function handleDelete(number, e) {

        e.stopPropagation();

        console.log("удаление данных");

        const result = await axios
        .delete (`https://sf-final-project-be.herokuapp.com/api/cases/${number._id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }
        )
        .then ((response) => {
            console.log(response);
        })
        .catch((error) => {
            setMessage(error.response.data.message);
        })
    }


    let count = 0;

    function gotoSteal (item, e) {
        // window.location.replace(`/case/${item._id}`);
        navigate(`/case/${item._id}`);
    }
    
    return(
        <>
        <h1 className={css.h1}>Кражи</h1>
        <p>{message}</p>
        {
            data.length ?
            <>                
                <div className={css.stealHeaders}>
                        <p>#</p>
                        <p>Номер лицензии</p>
                        <p>Тип</p>
                        <p>Дата кражи</p>
                        <p>Удалить</p>
                    </div>
                    <div className={css.stealsTable}>
                        {
                            data ? data.map((item) => {
                                    return <div className={css.steals} key={item._id} props={item} onClick={(e)=>{e.stopPropagation(); gotoSteal(item, e)}}>
                                        <p>{(count+=1)}</p>
                                        <p>{item.licenseNumber}</p>
                                        <p>{item.type}</p>
                                        <p>{item.date}</p>
                                        <div className={css.button} onClick={(e)=>handleDelete(item, e)}>
                                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                                        </div>
                                    </div>
                            }) 
                            :  
                            <div><p>{message}</p></div>
                        }
                    </div>
            </>
            : 
            <div style={{color:'#4700BE', textAlign: 'left'}}>Идет загрузка данных...</div>
        }
        </>
    )
}

export {Steal}