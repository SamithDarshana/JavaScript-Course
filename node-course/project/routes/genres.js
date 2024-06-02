const express = require('express')
const Joi = require('joi')
const router = express.Router()

const genres = [
    {
        id: 1,
        name: 'Action'
    },
    {
        id: 2,
        name: 'Horor'
    }
]

router.get('/', (req, res) => {
    res.send(genres)
})

router.get('/:id', (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('Not found')
    res.send(genre) 
})

router.post('/', (req, res) => {
    const name = req.body.name
    const {error} = validate(name)
    if(error) return res.status(400).send(error.details[0].message)
    genres.push({id: genres.length + 1, name: name})
    res.send('Genre added')
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const name = req.body.name 
    const genre = genres.find(genre => genre.id === parseInt(id))
    if(!genre) return res.status(404).send('Not found')
    const {error} = validate(name)
    if(error) return res.status(400).send(error.details[0].message)
    genre.name = name
    return res.send('Genre updated')
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const genre = genres.find(genre => genre.id === parseInt(id))
    if(!genre) 
        return res.status(404).send('Not found')
    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send('Genre deleted')    
})

function validate(name){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate({name})
}

module.exports = router