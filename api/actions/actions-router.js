// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const { validateActionId, validateNewAction} =require('./actions-middlware')
const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => res.status(200).json(actions))
        .catch(err => next(err))
})

router.post('/', validateNewAction,(req, res, next) => {
    Actions.insert(req.body)
        .then(action => res.status(201).json(action))
        .catch(err => next(err))
})

router.get('/:id', validateActionId, (req, res, next) => {
    // Actions.get(req.params.id)
    //     .then(action => res.status(200).json(action))
    //     .catch(err => next(err))
    res.status(200).json(req.action)
})

router.put('/:id', validateNewAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(update => res.status(200).json(update))
        .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
    Actions.remove(req.params.id)
        .then(count => res.status(200).json({message: `Successfully `}))
        .catch(err => next(err))
})

module.exports = router