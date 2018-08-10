const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const axios = require('axios')
const querystring = require('querystring')
const pkg = require('../package.json')

const stages = ['dev', 'prod']

inquirer.prompt([
    {
        type: 'list',
        name: 'stage',
        message: 'Stage:',
        default: 'dev',
        choices: stages,
    }
]).then((answers) => {
    const stage = answers.stage

    const url = `url`
    const options = querystring.stringify({
        token: pkg.gitlabCI.token,
        ref: stage === 'dev' ? 'master' : 'production',
        'variables[STAGE]': stage
    })

    axios.post(url, options)
})
