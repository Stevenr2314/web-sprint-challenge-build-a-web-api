const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

function validateActionId(req, res, next) {
    Actions.get(req.params.id)
        .then(action => {
            if (action) {
                req.action = action
                next()
            }
            else {
                next({ status: 404, message: 'Action not found' })
            }
        })
        .catch(err => next(err))
}

function validateNewAction(req, res, next) {

    if(!req.body.description || !req.body.project_id || !req.body.notes){
        next({ status: 400, message: `ProjectID: ${req.body.project_id}, Descriptions: ${req.body.description}, Notes: ${req.body.notes}` })
    }
    else if (req.body.description.length > 128) {
        next({ status: 400, message: `Description is too long at ${req.body.description.length} characters` })
    }
    else {
        Projects.get(req.body.project_id)
            .then(project => {
                if (!project) {
                    next({ status: 404, message: `The project with ID: ${req.body.project_id} could not be found` })
                }
                else {
                    next()
                }
            })
            .catch(err => next({status: 404, message: `Server couldn't complete this action`}))
    }
}

module.exports = {
    validateActionId,
    validateNewAction
}