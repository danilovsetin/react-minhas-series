import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({match}) => {
    const [form, setForm] = useState({})
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({})
    const [mode, setMode] = useState('INFO')
    const [genre, setGenre] = useState([])
    //const [genreId, setGenreId] = useState('')

    useEffect(() => {
        axios
            .get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)                
            })        

    },[match.params.id])

    useEffect(() => {
        axios
        .get('/api/genres')
        .then(res => {
            setGenre(res.data.data)            
        })
    },[])

    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value})
    }

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })
    }

    const save = () => {        
        axios
            .put('/api/series/' + match.params.id, form)
            .then(res => {
                setSuccess(true)
            })
    }

    if (success) {
        return <Redirect to='/series' />
    }
    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{background: 'rgba(0,0,0,0.7'}}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
                            </div>
                            <div className='col-8'>
                                <h1 className="font-weight-light text-white">{data.name}</h1>
                                <div className="text-white">
                                    { data.status === 'ASSISTIDO' && <Badge color="success">Assistido</Badge> }
                                    { data.status === 'NAO_ASSISTIDO' && <Badge color="warning" className="ml-1">Não Assistido</Badge> }
                                    <span className="ml-1">Genero: {data.genre}</span>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </header>
            <div>
                <button type="button" onClick={() => setMode('EDIT')} className="btn btn-warning mt-1">Editar</button>
            </div>
            {
                mode === "EDIT" &&            
                <div className="container">        
                    <h1>Editar Série</h1>                    
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input type="text" value={form.name} onChange={onChange('name')} className="form-control" id="name" placeholder="Nome" />                    
                        </div>  
                        <div className="form-group">
                            <label htmlFor="comments">Comentários</label>
                            <input type="text" value={form.comments} onChange={onChange('comments')} className="form-control" id="comments" placeholder="Comentários" />                    
                        </div>  
                        <div className="form-group">
                            <label htmlFor="genre">Genêro</label>
                            <select className="form-control" aria-label="Selecione o gênero" id="genre_id" onChange={onChange('genre_id')} value={form.genre_id}>                                                                
                                <option key="0" value="" selected>Selecione um genêro</option>
                                {genre.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                            </select>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="status" id="naoAssistido" value="NAO_ASSISTIDO" checked={form.status === 'NAO_ASSISTIDO'} onChange={seleciona('NAO_ASSISTIDO')} />
                            <label className="form-check-label" for="naoAssistido">
                                Não Assistido
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="status" id="assistido" value="ASSISTIDO" checked={form.status === 'ASSISTIDO'} onChange={seleciona('ASSISTIDO')} />
                            <label className="form-check-label" for="assistido">
                                Assistido
                            </label>
                        </div>
                        <div className='mt-2'>
                        <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
                        <button type="button" onClick={() => setMode('INFO')} className="btn btn-danger ml-1">Cancelar</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default InfoSerie