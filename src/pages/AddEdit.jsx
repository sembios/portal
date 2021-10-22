import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import './AddEdit.css'
import fireDb from '../firebase'
import {toast} from 'react-toastify'

const initialState = {
    firstName: "",
    lastName: "",
    patronymic: ""
}
export default function AddEdit() {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const {firstName, lastName, patronymic, typeDoc, typeGos, gosData, gender, status, placeOfBirth,
          inn, nomerPas, kodPodr, dataIst, citizenship, nationality, birthDay, contactPhone, idenCheck, idenType} = state

    const history = useHistory();

    const {id} = useParams();

    useEffect (() => {
        fireDb.child("profile").on("value", (snapshot) => {
            if(snapshot.val() !== null) {
                setData({...snapshot.val()});
            } else {
                setData({});
            }
        });
        return () => {
            setData({});
        };
    }, [id]);

    useEffect(() => {
        if(id) {
            setState({...data[id]})
        } else {
            setState({...initialState})
        }
        return () => {
            setState({...initialState})
        }
    }, [id, data])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !patronymic) {
            toast.error("Заполните поля")
        } else {
            if(!id) {
                fireDb.child("profile").push(state, (err) => {
                    if (err) {
                        toast.error(err);
                    } else {
                        toast.success("Профиль создан", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
                    }
                });
            } else {
                fireDb.child(`profile/${id}`).set(state, (err) => {
                    if (err) {
                        toast.error(err);
                    } else {
                        toast.success("Профиль обновлен", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
                    }
                });
            }
            setTimeout(() => history.push("/"), 500);
        }
    };
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setState({...state, [name]: value})
    };


    return (
        <div className="block">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="firstName">Имя</label>
                <input type="text" name="firstName" id="firstName" value={firstName} onChange={handleInputChange} placeholder="Введите имя"/>

                <label htmlFor="lastName">Фамилия</label>
                <input type="text" name="lastName" id="lastName" value={lastName} onChange={handleInputChange} placeholder="Введите фимилию"/>

                <label htmlFor="patronymic">Отчество</label>
                <input type="text" name="patronymic" id="patronymic" value={patronymic} onChange={handleInputChange} placeholder="Введите отчество"/>

                <label htmlFor="typeDoc">Тип документа</label>
                <select type="text" name="typeDoc" id="typeDoc" value={typeDoc} onChange={(e)=>handleInputChange(e)}>
                                        <option value="">-</option>
                                        <option value="Паспорт (ID Card)">Паспорт (ID Card)</option>
                                        <option value="Загран. паспорт">Загран. паспорт</option>
                                        <option value="Водительское удостоверение">Водительское удостоверение</option>
                                        </select>

                <label htmlFor="typeGos">Орган выдавший документ</label>
                <input type="text" name="typeGos" id="typeGos" value={typeGos} onChange={handleInputChange} placeholder="Орган выдавший документ"/>
            
                <label htmlFor="gosData">Дата выдачи</label>
                <input type="date" name="gosData" id="gosData" value={gosData} onChange={handleInputChange} placeholder="Дата выдачи"/>
                
                <label htmlFor="gender">Пол</label>
                <select type="text" name="gender" id="gender" value={gender} onChange={(e)=>handleInputChange(e)}>
                                        <option value="">-</option>
                                        <option value="Мужской">Мужской</option>
                                        <option value="Женский">Женский</option>
                                        </select>
                
                <label htmlFor="status">Статус</label>
                <select type="text" name="status" id="status" value={status} onChange={(e)=>handleInputChange(e)}>
                                        <option value="">-</option>
                                        <option value="Резидент">Резидент</option>
                                        <option value="Не резидент">Не резидент</option>
                                        </select>
                
                <label htmlFor="placeOfBirth">Место рождения</label>
                <input type="text" name="placeOfBirth" id="placeOfBirth" value={placeOfBirth} onChange={handleInputChange} placeholder="Место рождения"/>
                
                <label htmlFor="inn">ИНН</label>
                <input type="text" name="inn" id="inn" value={inn} onChange={handleInputChange} placeholder="ИНН"/>
                
                <label htmlFor="nomerPas">Номер и серия паспорта</label>
                <input type="text" name="nomerPas" id="nomerPas" value={nomerPas} onChange={handleInputChange} placeholder="Номер и серия паспорта"/>
                
                <label htmlFor="kodPodr">Код подразделения</label>
                <input type="text" name="kodPodr" id="kodPodr" value={kodPodr} onChange={handleInputChange} placeholder="Код подразделения"/>
                
                <label htmlFor="dataIst">Дата истечения</label>
                <input type="date" name="dataIst" id="dataIst" value={dataIst} onChange={handleInputChange} placeholder="Дата истечения"/>
                
                <label htmlFor="citizenship">Гражданство</label>
                <input type="text" name="citizenship" id="citizenship" value={citizenship} onChange={handleInputChange} placeholder="Гражданство"/>
                
                <label htmlFor="nationality">Национальность</label>
                <input type="text" name="nationality" id="nationality" value={nationality} onChange={handleInputChange} placeholder="Национальность"/>
                
                <label htmlFor="birthDay">Дата рождения</label>
                <input type="date" name="birthDay" id="date" value={birthDay} onChange={handleInputChange} placeholder="Дата рождения"/>
                
                <label htmlFor="contactPhone">Контакты</label>
                <input type="text" name="contactPhone" id="contactPhone" value={contactPhone} onChange={handleInputChange} placeholder="Контакты"/>
                
                <label htmlFor="idenCheck">Идентифицирован</label>
                <select type="text" name="idenCheck" id="idenCheck" value={idenCheck} onChange={(e)=>handleInputChange(e)}>
                                        <option value="">Нет</option>
                                        <option value={true}>Да</option>
                                        </select>

                <label htmlFor="idenType">Тип идентификации</label>
                <select type="text" name="idenType" id="idenType" value={idenType} onChange={(e)=>handleInputChange(e)}>
                                        <option value="">-</option>
                                        <option value="Онлайн">Онлайн</option>
                                        <option value="Онлайн (видео)">Онлайн (видео)</option>
                                        <option value="Офис">Офис</option>
                                        </select>


                <input type="Submit" value={id ? "Обновить" : "Сохранить"}/>
            </form>
        </div>
    )
}
