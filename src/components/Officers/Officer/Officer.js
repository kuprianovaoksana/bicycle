import css from "./officer.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';



const Officer = (item) => {


    const [message, setMessage] = useState("");
    const [data, setData] = useState("");

    const [clientId, setClientId] = useState("");
    const [approved, setApproved] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const href=""+window.location.href;
    const id = href.split('officer/')[1];
    let navigate = useNavigate();


        useEffect(()=>{
                    const getData = async () => {

            console.log("запрос информации сотрудника");

            const result =  await

            axios
            .get ('https://sf-final-project-be.herokuapp.com/api/officers/'+id,
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
                setMessage(error.response.data.message);
                console.log(error);
                if( error.response.status === 401 )
                {
                    // window.location.replace(`/entrance`)
                    navigate('/entrance')
                }
                else {
                    setMessage(error.response.data.message);
                }
        });
        }
        getData();

        });


const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Данные отправляются, пожалуйста подождите...");
    console.log("запрос изменения сотрудника");


    axios
    .put('https://sf-final-project-be.herokuapp.com/api/officers/'+id, {
        password,
        firstName,
        lastName,
        approved: approved
    },
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),

        },
    }
    )
    .then((response) => {
      setMessage("Данные изменены!");
    },
    )
    .catch((error) => {
        setMessage(error.response.data.message);
    });
};

return(
        <>
        <h1>Карточка сотрудника {item._id}</h1>
        <form className={css.officers} method="put" onSubmit={handleSubmit}>
            <label>Одобренный сотрудник:</label>
                <select value={approved} onChange={(e) => setApproved(e.target.value)}>
                    {
                        data.approved ?
                        <>
                            <option>{""+data.approved}</option>
                            <option>false</option>
                        </>
                        : <>
                            <option>{""+data.approved}</option>
                            <option>true</option>

                        </>
                    }
                </select>
            <label>ClientId:</label>
            <input type="text" name="clientId" placeholder={data.clientId} value={clientId} onChange={(e) => setClientId(e.target.value)} disabled/>
            <label>E-mail:</label>
            <input type="text" name="email" placeholder={data.email} value={email} onChange={(e) => setEmail(e.target.value)} disabled/>
            <label>Имя:</label>
            <input type="text" name="firstName" placeholder={data.firstName} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <label>Фамилия:</label>
            <input type="text" name="lastName" placeholder={data.lastName} value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            <label>Пароль:</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <p className={css.message}>{message}</p>
            <button>Редактировать</button>       
        </form>
        </>
    )
}

export {Officer}