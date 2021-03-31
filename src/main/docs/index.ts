import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'This API was developed in course of the Rodrigo Manguinho (Mango) teacher. This API has the objective to the realize surveys. [Click here](https://github.com/giovanivrech/clean-node-api) to go GitHub repository.',
    version: '1.0.0',
    contact: {
      name: 'Giovani Vrech',
      email: 'giovanivrech@gmail.com',
      url: 'https://www.linkedin.com/in/giovanivrech/'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  externalDocs: {
    description: 'Link to the course',
    url: 'https://www.udemy.com/course/tdd-com-mango/?referralCode=B53CE5CA2B9AFA5A6FA1'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  },
  {
    name: 'Survey'
  }],
  paths,
  schemas,
  components
}
