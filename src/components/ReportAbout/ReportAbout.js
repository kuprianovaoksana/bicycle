import css from "./reportabout.module.scss";
import { useState } from "react";
import axios from "axios";
import {useContext} from 'react';
import {AuthContext} from '../../context';
import { useEffect } from "react";


const ReportAbout = () => {

    const [licenseNumber, setLicenseNumber] = useState("");
    const [ownerFullName, setOwnerFullName] = useState("");
    const [color, setColor] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");    
    const [officer, setOfficer] = useState("");
    const [resolution, setResolution] = useState("");

    const [message, setMessage] = useState("");
    const{isAuth, setIsAuth} = useContext(AuthContext);

    const [data, setData] = useState("");

    let href;

    isAuth === true ? href ="https://sf-final-project-be.herokuapp.com/api/cases/"
    : href = "https://sf-final-project-be.herokuapp.com/api/public/report";

    
    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log("запрос на отправку сообщения");

        axios
        .post(href, {
          licenseNumber: licenseNumber,          
          ownerFullName: ownerFullName,
          type: type,          
          clientId: "556d59f3-7435-4875-9782-5682fd026069",
          color: color,
          date: date,
          description: description,
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")

            }
        }
        )
        .then((response) => {
          setLicenseNumber("");
          setOwnerFullName("");
          setColor("");
          setType("");
          setDate("");
          setDescription("");
          setOfficer("");
          setResolution("");
          setMessage("Сообщение о краже отправлено!");
        }
        )
        .catch((error) => {
            setMessage(error.response.data.message);
        })
    };

    useEffect(()=>{
        const getData =  () => {

            console.log("запрос на получение сотрудников");

            const result = 

                    axios
                    .get ('https://sf-final-project-be.herokuapp.com/api/officers/',
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    })
                    .then ((response) => {
                        ! data ?         
                        setData(response.data.officers)
                        : console.log("");
                    })
        }


        isAuth === true ?
        getData()
        : <></>

    }, []);



    return(
        <>
            <h1 className={css.h1}>Сообщить о краже</h1>
            <p className={css.message}>{message}</p>

            <form className={css.registration} method="post" onSubmit={handleSubmit}>
                <input type="text" name="licenseNumber" placeholder='Номер лицензии *'  value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} required />
                <label>
                    Тип велосипеда *:
                    <select value={type} onChange={(e) => setType(e.target.value)} required>                    
                        <option>sport</option>
                        <option>general</option>
                    </select>
                </label>
                <input type="text" name="ownerFullName" placeholder='ФИО *' value={ownerFullName} onChange={(e) => setOwnerFullName(e.target.value)} required />
                <input type="text" name="color" placeholder='Цвет велосипеда' value={color} onChange={(e) => setColor(e.target.value)}/>
                <label>Дата кражи (необязательно):</label>
                <input type="date" name="date" placeholder='Дата кражи' value={date} onChange={(e) => setDate(e.target.value)}/>
                {
                    isAuth === true ?
                        <label>
                        Ответственный сотрудник:                
                            <select value={officer} onChange={(e) => setOfficer(e.target.value)} required>
                                { data ?
                                    <>
                                        { data.map((item)=>{
                                            if( item.approved === true ){
                                                return <option key={item._id}>{item.lastName}</option>
                                            }
                                        })}
                                    </>
                                    : 
                                    <></>
                                }
                            </select>
                        </label>
                    : 
                    <></>
                }
                <input type="text" name="description" placeholder='Дополнительный комментарий' value={description} onChange={(e) => setDescription(e.target.value)}/>
                <input type="text" name="resolution" placeholder='Завершающий комментарий' value={resolution} onChange={(e) => setResolution(e.target.value)}/>
                <button>Сообщить о краже</button>
            </form>
        </>
    )
}

export {ReportAbout};