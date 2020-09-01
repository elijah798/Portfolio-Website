const express = require('express')
const app = express()
const port = 3000
const { data } = require('./data/projectData.json');
const { Projects } = data;
const projectLength = Projects.length;

//set up for middleware
app.set('view engine', 'pug')
app.set('views', './views')
app.use('/static', express.static('public'))

//sets route for index page
app.get('/', (req, res) => {
        res.render('index', {
            Projectss: Projects,
        });
    })
    //route to send client to about page
app.get('/about', (req, res) => {
        res.render('about');
    })
    //route that send data about project to project pages
app.get('/project/:id', (req, res) => {
        if (req.params.id <= projectLength - 1) {
            res.render('project', {
                projectName: Projects[req.params.id].ProjectName,
                description: Projects[req.params.id].description,
                liveLink: Projects[req.params.id].live_link,
                githubLink: Projects[req.params.id].github_link,
                imageURL: Projects[req.params.id].image_urls,
                tech: Projects[req.params.id].technologies,
                imageOne: Projects[req.params.id].imagesOne,
                imageTwo: Projects[req.params.id].imagesTwo,
                imageThree: Projects[req.params.id].imagesThree,
            });
        } else {
            //error route handling
            res.status(404).send({
                status: 404,
                error: 'Not Found'

            })
        }
    })
    //error route handling
app.use((req, res, next) => {
        res.status(404).send({
            status: 404,
            error: 'Not Found'

        })
    })
    //start express 
app.listen(port, () => {
    console.log(`app listening on localhost:${port}`)
})