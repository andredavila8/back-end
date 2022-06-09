import express, { Request, Response } from 'express'
import cors from 'cors'
import { errands } from './data/data'
import { getRandomInt } from './helpers/generateId'
import { midVerifyFields, midVerifyId } from './middlewares/routesMiddlewares'

const app = express()
app.use(express.json())
app.use(cors())

// rota para exibir todos

app.get('/errands', (request: Request, response: Response) => {
    return response.status(200).json({
        msg: "All errands",
        errands
    })
})

// rota para adicionar um

app.post('/errands', midVerifyFields, (request: Request, response: Response) => {
    const { description, detail } = request.body

    const newErrand = {
        id: getRandomInt(0, 100),
        description,
        detail
    }

    errands.push(newErrand)

    return response.status(201).json({
        msg: "Success",
        item: newErrand,
        errands
    })
})

// rota para deletar um

app.delete('/errands/:id', midVerifyId, (request: Request, response: Response) => {
    const { id } = request.params

    const item = errands.findIndex((f) => parseInt(id) === f.id)

    errands.splice(item, 1)

    return response.status(200).json({
        msg: "Success",
        errands
    })
})

// rota para alterar um 

app.put('/errands/:id', midVerifyId, midVerifyFields, (request: Request, response: Response) => {
    const { id } = request.params
    const { description, detail } = request.body

    const item = errands.find((f) => parseInt(id) === f.id)

    if (item) {
        item.description = description
        item.detail = detail
    }

    return response.status(200).json({
        msg: "Success",
        item,
        errands
    })
})

app.listen(process.env.PORT || 3333, () => {
    console.log('servidor rodando')
})