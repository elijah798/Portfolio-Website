const express = require('express')
const app = express()
const port = 3000
const { data } = require('./data/projectData.json');
const { Projects } = data;

app.set('view engine', 'pug')
app.set('views', './views')
app.use('/static', express.static('public'))

app.get('/',(req, res) => {
    res.render('index');
})

app.get('/about',(req, res) => {
    res.render('about');
})

app.get('/project/:id',(req, res) => {
    res.render('project', {
        projectName: Projects[req.params.id].Project,
        description: Projects[req.params.id].description,
        liveLink: Projects[req.params.id].live_link,
        githubLink: Projects[req.params.id].github_link,
        imageURL: Projects[req.params.id].image_urls,
        tech: Projects[req.params.id].technologies,
        imageOne: Projects[req.params.id].imagesOne,
        imageTwo: Projects[req.params.id].imagesTwo,
        imageThree: Projects[req.params.id].imagesThree,
    });
})

app.listen(port, () => {
    console.log(`app listening on localhost:${port}`)
})