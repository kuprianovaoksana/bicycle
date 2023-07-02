import css from "./case.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';



const Case = () => {


    const [message, setMessage] = useState("");
    const [data, setData] = useState("");

    const [clientId, setClientId] = useState("");
    const [color, setColor] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [officer, setOfficer] = useState("");
    const [ownerFullName, setOwnerFullName] = useState("");
    const [resolution, setResolution] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");

    const href="" + window.location.href;
    const id = href.split('case/')[1];

    let navigate = useNavigate();

    useEffect(()=>{
        const getData = async () => {

            console.log("получение данных");

            const result = await 

                axios
                .get ('https://sf-final-project-be.herokuapp.com/api/cases/' + id,
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
    }, []);

const handleSubmit = async (e) => {

    e.preventDefault();
    setMessage("Данные отправляются, пожалуйста подождите...");
    console.log("редактирование данных");

    axios
    .put('https://sf-final-project-be.herokuapp.com/api/cases/' + id, {
        status,
        licenseNumber,
        ownerFullName,
        type,
        color,
        date,
        officer,
        description,
        resolution
    },
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),

        },
    }
    )
    .then((response) => {
      setMessage("Сообщение отредактировано!");
      console.log(response);
    },
    )
    .catch((error) => {
        setMessage(error.response.data.message);
    });
};


    return(
        <>
        <h1>Кража</h1>

        { data ?
            <div>
                <form className={css.inputs} method="post" onSubmit={handleSubmit}>
                    <label>ClientId:</label>
                    <input type="text" name="clientId" placeholder={data.clientId} value={clientId} onChange={(e) => setClientId(e.target.value)} disabled/>
                    <label>Цвет велосипеда:</label>
                    <input type="text" name="color" placeholder={data.color} value={color} onChange={(e) => setColor(e.target.value)}/>
                    <label>Сообщение создано:</label>
                    <input className={css.inputDate} type="text" name="createdAt" placeholder={data.createdAt} value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} disabled/>
                    <label>Дата кражи:</label>
                    <input type="date" name="date" placeholder={data.date} value={date} onChange={(e) => setDate(e.target.value)}/>
                    <label>Описание:</label>
                    <input type="text" name="description" placeholder={data.description} value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <label>Номер лицензии *:</label>
                    <input type="text" name="licenseNumber" placeholder={data.licenseNumber} value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)}/>
                    <label>Сотрудник:</label>
                    <input type="text" name="officer" placeholder={data.officer} value={officer} onChange={(e) => setOfficer(e.target.value)}/>
                    <label>Владелец *:</label>
                    <input type="text" name="ownerFullName" placeholder={data.ownerFullName} value={ownerFullName} onChange={(e) => setOwnerFullName(e.target.value)}/>
                    <label>Комментарии:</label>
                    <input type="text" name="resolution" placeholder={data.resolution} value={resolution} onChange={(e) => setResolution(e.target.value)}/>
                    <label>Статус *:</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} placeholder={data.status}>
                                <option>new</option>
                                <option>in_progress</option>
                                <option>done</option>
                        </select>
                    <label>Тип велосипеда:</label>
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option>sport</option>
                            <option>general</option>
                        </select>
                    <label>Изменено:</label>
                    <input className={css.inputDate} type="text" name="updatedAt" placeholder={data.updatedAt} value={updatedAt} onChange={(e) => setUpdatedAt(e.target.value)} disabled/>
                    <p className={css.message}>{message}</p>
                    <button>Редактировать</button>       
                </form>
            </div>
            : 
            <div>Идет загрузка данных...</div>
        }
        </>
    )
}

export {Case}