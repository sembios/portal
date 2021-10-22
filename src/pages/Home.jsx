import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import fireDb from '../firebase'
import './Home.css'

export default function Home() {
    const [data, setData] = useState ({});
    const [searchVal, setSearchVal] = useState('')
    const [searchNum, setSearchNum] = useState('')
    const [searchData, setSearchData] = useState ({});

    useEffect (() => {
        async function myData () {
            try {
                await fireDb.child("profile").on("value", (snapshot) => {
                    if(snapshot.val() !== null) {
                        setData({...snapshot.val()});
                    } else {
                        setData({});
                    }
                });
                return () => {
                    setData({});
                };
            }
            catch (err) {
                toast.success("Загрузка данных")
            }
        }
        myData ()
    }, []);

    const onDelete = (id) => {
        if (window.confirm("Уверены что хотите удалить ?")) {
            fireDb.child(`profile/${id}`).remove((err) => {
                if (err) {
                    toast.error(err);
                } else {
                    toast.success("Профиль удален")
                }
            })
        }
    }

    const Search = async () => {
        {
            await fireDb.child("profile").orderByChild("lastName").equalTo(searchVal).on("value", function(snapshot) {
                if (snapshot.exists()) {
                    setSearchData({...snapshot.val()});
                     console.log("exists");
                     console.log(searchData);
                }else{
                    setSearchData({});
                    toast.error("Не найдено", {
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
    }

    const SearchPhone = async () => {
        {
            await fireDb.child("profile").orderByChild("contactPhone").equalTo(searchNum).on("value", function(snapshot) {
                if (snapshot.exists()) {
                    setSearchData({...snapshot.val()});
                     console.log("exists");
                     console.log(searchData);
                }else{
                    setSearchData({});
                    toast.error("Не найдено")
                  }
                });
        }
    }


    return (
        
        <div style={{marginTop: "100px"}}>
            <table className="Searchlist">
                <h1>Поиск профиля</h1>
            <div className="searchNav">
            <div className="numberSearch">
            {searchVal && <img className="clear" src="/images/close.svg" alt="close" onClick={() => setSearchVal("")}/>}
                <input type="text" placeholder="Поиск по фамилии" value={searchVal} onChange={(e) => setSearchVal(e.target.value)}/>
                <img onClick={() => Search()} src="/images/search.png" alt="" />
            </div>
            <div className="numberSearch">
            {searchNum && <img className="clear" src="/images/close.svg" alt="close" onClick={() => setSearchNum("")}/>}
                <input type="text" placeholder="Поиск по номеру" value={searchNum} onChange={(e) => setSearchNum(e.target.value)}/>
                <img onClick={() => SearchPhone()} src="/images/search.png" alt="" />
            </div>
            </div>
            </table>

            <table className="list">
                <thead>
                    <tr style={{textAlign: "center"}}>
                        <th>№</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Телефон</th>
                        <th>Управление</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(searchData).map((id, index) => {
                        return (
                            <tr key={id}>
                                <th scope="row">{index + 1}</th>
                                <td>{data[id].firstName}</td>
                                <td>{data[id].lastName}</td>
                                <td>{data[id].contactPhone}</td>
                                <td>
                                    <Link to={`/update/${id}`}>
                                        <button className="btn btn-edit">Изменить</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={() => onDelete(id)}>Удалить</button>
                                    <Link to={`/view/${id}`}>
                                        <button className="btn btn-view">Просмотр</button>
                                    </Link>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
