// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => res.status(200).json(projects))
        .catch(err => next(err))
})

router.post('/', (req, res, next) => {
    Projects.insert(req.body)
        .then(project => res.status(201).json(res.body))
        .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
    Projects.get(req.params.id)
        .then(project => res.status(200).json(res.body))
        .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(update => res.status(200).json(update))
        .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
    Projects.remove(req.params.id)
        .then(count => res.status(200).json(res.message))
        .catch(err => next(err))
})

router.get('/:id/actions', (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => res.status(200).json(actions))
})

module.exports = router