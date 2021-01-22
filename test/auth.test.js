const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('When the user is not authenticated', () => {
  it('Should be able to access to home page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.be.html;
        res.should.have.status(200);
        done(err);
      });
  });

  it('Should be redirected from artists page to home page', (done) => {
    chai.request(app)
      .get('/artists')
      .end((err, res) => {
        res.should.be.html;
        res.should.have.status(200);
        res.should.redirectTo(res.request.url);
        done(err);
      });
  });

  it('Should be redirected from albums page to home page', (done) => {
    chai.request(app)
      .get('/albums')
      .end((err, res) => {
        res.should.be.html;
        res.should.have.status(200);
        res.should.redirectTo(res.request.url);
        done(err);
      });
  });

  it('Should be redirected from tracks page to home page', (done) => {
    chai.request(app)
      .get('/tracks')
      .end((err, res) => {
        res.should.be.html;
        res.should.redirectTo(res.request.url);
        res.should.have.status(200);
        done(err);
      });
  });
});
