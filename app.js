const express = require('express')
const app = express()
const port = 3000
const { data } = require('./data/data.json');
const { Projects } = data;
const projectLength = Projects.length;

//set up for middleware
app.set('view engine', 'pug')
app.set('views', './views')
app.use('/static', express.static('public'))

//sets route for index page
app.get('/', (req, res) => {
        res.render('index',{Projects}
        );
    })
    //route to send client to about page
app.get('/about', (req, res) => {
        res.render('about');
    })
    //route that send data about project to project pages
app.get('/project/:id', (req, res) => {
        if (req.params.id <= projectLength - 1) {
            res.render('project', {
                project_name: Projects[req.params.id].project_name,
                description: Projects[req.params.id].description,
                liveLink: Projects[req.params.id].live_link,
                githubLink: Projects[req.params.id].github_link,
                image_urls: Projects[req.params.id].image_urls,
                tech: Projects[req.params.id].technologies
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
        console.log("It seems like the server couldnt find the page you were looking for");
    })
    //start express 
app.listen(port, () => {
    console.log(`app listening on localhost:${port}`)
})