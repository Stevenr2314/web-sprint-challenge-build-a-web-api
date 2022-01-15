const Projects = require('../projects/projects-model')

function validateProjectId(req, res, next) {
    Projects.get(req.params.id)
      .then(project => {
        if(project){
          next()
        }
        else{
          next({status: 404, message: 'Action not found'})
        }
      })
      .catch(err => next(err))
  }

function validateNewProject(req, res, next) {

    if(!req.body.description || !req.body.name){
        next({ status: 400, message: `Missing required information! Name: ${req.body.name}, Description: ${req.body.description}` })
    }
    else {
        next()
    }
}

function checkCompleted(req, res, next) {
    if(req.body.completed === true){
        next({status: 400, message: 'Project is already completed'})
    } else {
        next()
    }
}

  module.exports = {
      validateProjectId,
      validateNewProject,
      checkCompleted
  }