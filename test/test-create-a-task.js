const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../server');

const { expect } = chai;

chai.use(chaiHttp);

describe('Task tests', () => {

    describe('create a task', () => {
        it('should return a task created', (done) => {            

            chai.request(app)
                .post('/tasks')
                .send({                    
                    'title': 'My first task',
                    'description': 'This task is for a demo  example'
                })
                .end(function(err, res){

                    if (err) done(err)
                    //console.log(res)

                    expect(res).to.have.status(201);
                    expect(JSON.parse(res.text)).to.have.all.keys('id', 'title', 'description', 'status', 'created_at', 'updated_at');

                    done()
                   
                });
        })

        it('should return an error if title is empty', (done) => {            

            chai.request(app)
                .post('/tasks')
                .send({                    
                    'description': 'This task is for a demo  example'
                })
                .end(function(err, res){

                    if (err) done(err)
                    //console.log(res)

                    expect(JSON.parse(res.text)).to.own.include({error: 'title does not exists!'});
                    expect(res).to.have.status(500)

                    done()
                   
                });
        })

        it('should return an error if description is empty', (done) => {            

            chai.request(app)
                .post('/tasks')
                .send({                    
                    'title': 'My first task'
                })
                .end(function(err, res){

                    if (err) done(err)
                    //console.log(res)

                    expect(JSON.parse(res.text)).to.own.include({error: 'description does not exists!'});
                    expect(res).to.have.status(500)

                    done()
                   
                });
        })

        
    })
})