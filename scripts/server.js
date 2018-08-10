const fs = require('fs')
const path = require('path')
const axios = require('axios')

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const config = require('../webpack.config.dev')

const port = 3000
const host = 'localhost'

const STAGE = process.argv[2] || 'dev'
const CONFIGURATOR_API =
  STAGE === 'prod'
    ? 'prod-url'
    : 'dev-url'

const request = axios.create({
  baseURL: CONFIGURATOR_API,
})

function getAllProjects() {
  return new Promise((res, rej) => {
    let page = 1
    let projectsArr = []
    const perPage = 30

    getPage(page)

    function getPage(page) {
      getProjects(page)
        .then(projects => {
          projectsArr = projectsArr.concat(projects)
          projects.length >= perPage ? getPage(++page) : res(projectsArr)
        })
        .catch(error => console.log(error))
    }
  })
}

function getProjects(page = 1) {
  return request
    .get('/projects', { params: { page } })
    .then(response => response.data)
    .then(projects =>
      projects.map(project => ({ id: project.id, name: project.name, domain: project.domain[0] }))
    )
    .catch(error => console.log(error))
}

new WebpackDevServer(webpack(config), {
  publicPath: '/',
  quiet: true,
  compress: true,
  historyApiFallback: {
    disableDotRule: true,
  },
  stats: 'errors-only',
  port: 3000,
  hot: true,
  overlay: {
    warnings: true,
    errors: true,
  },
  before(app) {
    const domains = []

    getAllProjects().then(data => {
      domains.push(...data)
    })

    app.get('/devtools/domains', function (req, res) {
      res.json(domains)
    })

    app.get('/devtools/projects', function (req, res) {
      const srcpath = './src/projects'
      const projects = fs
        .readdirSync(srcpath)
        .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory())
      res.json(projects)
    })

    app.get('/devtools/themes', function (req, res) {
      const srcpath = './src/assets/themes'
      const themes = fs.readdirSync(srcpath)
      res.json(themes)
    })
  },
}).listen(port, host, err => {
  if (err) {
    console.log(err)
  }

  //   console.log('Project: ' + project)
  //   console.log('Stage: ' + stage)
  console.log(`Listening at http://${host}:${port}`)
})
