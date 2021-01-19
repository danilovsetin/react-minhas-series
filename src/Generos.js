import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

const Generos = () => {
    const [data, setData] = useState([])
    const [novo, setNovo] = useState(false)

    useEffect(() => {
    axios
        .get('/api/genres')
        .then(res => {
        setData(res.data.data)
    })
    },[])

    const deletarGenero = id => {
        axios
            .delete("/api/genres/" + id)
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
                <button className="btn btn-danger" onClick={() => deletarGenero(record.id)}>Remover</button>
                <Link to={'/generos/' + record.id} className="btn btn-warning">Editar</Link>
            </td>
        </tr>)
    }

    const novoGenero = () => {
        setNovo(true)
    }

    if (novo) {
        return (<Redirect to='/generos/novo' />)
    }

    if(data.length == 0){
        return (
            <div className="container">
                <h1>Generos</h1>
                <div className="alert alert-warning" role="alert">
                    Não existem generos cadastrados.
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <h1>Generos</h1>
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
            <button type="button" onClick={novoGenero} className="btn btn-primary">Novo Genero</button>
        </div>
        )
  }

export default Generos