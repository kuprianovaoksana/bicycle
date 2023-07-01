import css from "./employees.module.scss";
import { useState } from "react";
import axios from "axios";

 
const Employees = () => {


    const [message, setMessage] = useState("");
    const [data, setData] = useState("");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [approved, setApproved] = useState('');

    let count = 0;

    const getData = async () => {

        const result = await 

                axios
                .get ('https://sf-final-project-be.herokuapp.com/api/officers/',
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .catch((error) => {
                    setMessage(error.response.data.message);
                    if(error.response.status===401)
                    {
                        window.location.replace(`/entrance`)
                    }
                    else {
                        setMessage(error.response.data.message);
                    }
                });

        setData(result.data.officers);

}

getData();

async function handleDelete(number, e) {

    e.stopPropagation();

    const result = await axios
    .delete (`https://sf-final-project-be.herokuapp.com/api/officers/${number._id}`,
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

async function addNewOfficer (e) {
    e.preventDefault();
    const result = await axios
        .post("https://sf-final-project-be.herokuapp.com/api/officers", {
            email,
            password,
            firstName,
            lastName,
            approved: 'false'
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }
        )
        .then((response) => {
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
        //   setMessage("С");
        //   console.log(response);
        },
        )
        .catch((error) => {
            if(error.response.status===401)
            {
                window.location.replace(`/entrance`)
            }
            else {
                setMessage(error.response.data.message);
            }

        });
}

function gotoOfficer(item){
    window.location.replace(`/officer/${item._id}`);
}


return(
        <>
       
        <h1 className={css.h1}>Ответственные сотрудники</h1>
        <p>{message}</p>
        {data.length?
        <>        
        <div className={css.employeesHeaders}>
            <p>#</p>
            <p>Имя</p>
            <p>Фамилия</p>
            <p>Одобренные</p>
            <p>Удалить</p>
        </div>
        <div className={css.employeesTable}>
            {data ? data.map((item) => {
                return <div className={css.employees} key={item._id} onClick={(e)=>{e.stopPropagation(); gotoOfficer(item, e)}}>
                    <p>{(count+=1)}</p>
                    {item.firstName ?
                    <p>{item.firstName}</p>
                    : <p>[Имя сотрудника не указано]</p>
                    }
                    <p>{item.lastName}</p>
                    { item.approved === true ?
                        <input type="checkbox" approved={approved} onChange={(e) => setApproved(e.target.value)} checked="checked" disabled></input>
                        :
                        <input type="checkbox" approved={approved} onChange={(e) => setApproved(e.target.value)} disabled></input>
                    }
                    <div className={css.button} onClick={(e)=>handleDelete(item, e)}>
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                    </div>
                </div>
            }) :  <div><p>{message}</p></div>}
        </div>
        </>
        : <div style={{color:'#4700BE', textAlign: 'left'}}>Идет загрузка данных...</div>
        }
        <form method="post" onSubmit={addNewOfficer}>
            <button className={css.button}>Добавить сотрудника:</button>
            <input type="text" name="email" placeholder='email'  value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" name="password" placeholder='пароль'  value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="text" name="firstName" placeholder='Имя'  value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text" name="lastName" placeholder='Фамилия'  value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </form>
        </>
    )
}

export {Employees}