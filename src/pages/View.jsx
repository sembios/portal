import React, {useState, useEffect} from 'react'
import fireDb from '../firebase'
import {useParams, Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import style from './View.module.scss'

export default function View() {
    const [user, setUser] = useState({});

    const {id, onSearch} = useParams();

    const history = useHistory();

    const hendleGoBack = (e) => {
        e.preventDefault();
        history.goBack();

    }
    
    useEffect(() => {
                fireDb.child(`profile/${id}`).get().then((snapshot) => {
                    if(snapshot.exists()) {
                        setUser({...snapshot.val()});
                    } else {
                        setUser({})
                    }
                });
    }, [id])
    return (
        <div className={style.container}>
            <div>
                        <div className={style.Inform}>
                            <div className={style.header}>
                                <h4>Идентификация пользоватилей</h4>
                                <button onClick={hendleGoBack}>Назад</button>
                            </div>
                            <div className={style.renderFio}>
                                <div><h6>Имя</h6>
                                    <p>{user.firstName}</p>
                                </div>
                                <div><h6>Фамилия</h6>
                                    <p>{user.lastName}</p>
                                </div>
                                <div><h6>Отчество</h6>
                                    <p>{user.patronymic}</p>
                                </div>
                            </div>
                        </div>
                        <div className={style.Inform}>
                            <div className={style.docItem}>
                                <h4>Документ, удостоверяющий личность</h4>
                            </div>
                            <div className={style.render}>
                                <div><h6>Тип документа</h6>
                                    <p>{user.typeDoc}</p>
                                </div>
                                <div><h6>Орган выдавший документ</h6>
                                    <p>{user.typeGos}</p>
                                </div>
                                <div><h6>Дата выдачи</h6>
                                    <p>{user.gosData}</p>
                                </div>
                                <div><h6>Пол</h6>
                                    <p>{user.gender}</p>
                                </div>
                                <div><h6>Статус</h6>
                                    <p>{user.status}</p>
                                </div>
                                <div><h6>Место рождение</h6>
                                    <p>{user.placeOfBirth}</p>
                                </div>
                                <div><h6>ИНН</h6>
                                    <p>{user.inn}</p>
                                </div>
                                <div><h6>Номер и серия паспорта</h6>
                                    <p>{user.nomerPas}</p>
                                </div>
                                <div><h6>Код подразделения</h6>
                                    <p>{user.kodPodr}</p>
                                </div>
                                <div><h6>Дата истечения</h6>
                                    <p>{user.dataIst}</p>
                                </div>
                                <div><h6>Гражданство</h6>
                                    <p>{user.citizenship}</p>
                                </div>
                                <div><h6>Национальность</h6>
                                    <p>{user.nationality}</p>
                                </div>
                                <div><h6>Дата рождения</h6>
                                    <p>{user.birthDay}</p>
                                </div>
                                <div><h6>Контакты</h6>
                                    <p>{user.contactPhone}</p>
                                </div>
                            </div>
                            <div className={style.docItem}>
                                <h4>Отметки оператора</h4>
                            </div>
                            <div className={style.renderIden}>
                            <div><h6>Статус пользователя</h6>
                                    <p>{user.idenCheck ? <p><input type="checkbox" checked disabled/>{'Идентифицирован'}</p> : "Не идентифицирован"}</p>
                                    <p>{user.idenCheck ? <select disabled className={style.select}>
                                        <option value="">{user.idenType}</option>
                                    </select> : ""}</p>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    )
}
