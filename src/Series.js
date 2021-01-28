import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

const Series = () => {
    const [data, setData] = useState([])
    const [novo, setNovo] = useState(false)

    useEffect(() => {
    axios
        .get('/api/series')
        .then(res => {
        setData(res.data.data)
    })
    },[])

    const deletarSerie = id => {
        axios
            .delete("/api/series/" + id)
            .then(res => {
                const filtrado = data.filter(item => item.id !== id)
                setData(filtrado)
            })
    }

    const renderizaLinha = record => {
        return (
            <tr key={record.id}>
            <th scope="row">{record.id}</th>
            <td>{record.name}</td>            
            <td>
                <button className="btn btn-danger" onClick={() => deletarSerie(record.id)}>Remover</button>
                <Link to={'/series/' + record.id} className="btn btn-info ml-1">Info</Link>
            </td>
        </tr>)
    }

    const novaSerie = () => {
        setNovo(true)
    }

    if (novo) {
        return (<Redirect to='/series/novo' />)
    }

    if(data.length === 0){
        return (
            <div className="container">
                <h1>Séries</h1>
                <div className="alert alert-warning" role="alert">
                    Não existem séries cadastradas.
                </div>
                <button type="button" onClick={novaSerie} className="btn btn-primary">Nova Série</button>
            </div>
        )
    }

    return (
        <div className="container">
            <h1>Séries</h1>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>                    
                    </tr>
                </thead>
                <tbody>
                    {data.map(res => renderizaLinha(res))}
                </tbody>
            </table>
            <button type="button" onClick={novaSerie} className="btn btn-primary">Nova Série</button>
        </div>
        )
  }

export default Series