import React, {useState, useMemo} from 'react'
import api from '../../services/api'

import camera from '../../assets/camera.svg'
import './styles.css'

export default function New({ history }){

    const [company, setCompany] = useState('')
    const [techs, setTechs] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState(null)

    const preview = useMemo(
        ()=> {
            return thumbnail ? URL.createObjectURL(thumbnail) : null
        }, [thumbnail]
    )

    async function handleSubmit(e){
        e.preventDefault()

        const data = new FormData()
        const user_id = localStorage.getItem('user')

        data.append('thumbnail', thumbnail)
        data.append('company', company)
        data.append('techs', techs)
        data.append('price', price)

        await api.post('/spots', data, {
            headers: {user_id}
        })

        history.push('/dashboard')
    }

    return(
        <form onSubmit={handleSubmit}>

            <label id="thumbnail" style={{backgroundImage: `url(${preview})` }} className={thumbnail ? 'has-thumbnail' : ''}>
                <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
                <img src={camera} alt="camera icon"/>
            </label>

            <label htmlFor="company">
                Empresa
            </label>
            <input 
                id="company"
                placeholder="Sua empresa"
                value={company}
                onChange={e => setCompany(e.target.value)}
            />

            <label htmlFor="techs">
                Tecnologias 
                <span>
                    (separadas por vírgula)
                </span>
            </label>
            <input 
                id="techs"
                placeholder="React Native, Node"
                value={techs}
                onChange={e => setTechs(e.target.value)}
            />
            
            <label htmlFor="techs">
                Valor da diária 
                <span>
                    (em branco para gratuito)
                </span>
            </label>
            <input 
                id="price"
                value={price}
                placeholder="25,00"
                onChange={e => setPrice(e.target.value)}
            />

            <button className="btn" type="submit">Cadastrar</button>
        </form>
    )
}