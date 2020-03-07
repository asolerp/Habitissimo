import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { findUser } from '../repositories/User'  

// Configure chai
chai.use(chaiHttp);
chai.should();

// Create budget to test
let idBudget;
const budget = {
  title: "Diseñador/a",
  description: "Busco proyecto de reforma",
  category: "categoría",
  subcategory: "subcategoría",
  email: "cbaudes@gmail.com",
  phone: "696 48 79 07",
  address: "Calvià"
}
chai.request(app)
    .post('/api/budget')
    .set('Content-Type', 'application/json')
    .send(budget)
    .end((err, res) => {
      idBudget = res.body.id
    })

// Tests
describe("Budget", () => {
  describe("GET /", () => {
      // Test to get paginated budgedts
      it("should get budget paginated", (done) => {
           chai.request(app)
              .get('/api/budget')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  done();
              });
       });
  });
  describe("POST /", () => {
      // Test to create a new budget
      it("should create a new budget and create user if not exists or update if exists", (done) => {
        const budget = {
          title: "Diseñador/a",
          description: "Busco proyecto de reforma",
          category: "categoría",
          subcategory: "subcategoría",
          email: "cbaudes@gmail.com",
          phone: "696 48 79 07",
          address: "Calvià"
        }
        chai.request(app)
            .post('/api/budget')
            .set('Content-Type', 'application/json')
            .send(budget)
            .end(async (err, res) => {
              const user = await findUser(budget.email)
              chai.expect(user).to.have.deep.property('email', budget.email);
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
          });
      })
  })
  describe("PUT /", () => {
    // Test to update a budget
    it("should update a budget with optinional data", (done) => {
      const budgetToUpdate = {
        id: idBudget,
        title: "Cambio"
      }
      chai.request(app)
        .put('/api/budget')
        .set('Content-Type', 'application/json')
        .send(budgetToUpdate)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();  
        })
    })
    it("should publish a budget with no empty title and category", (done) => {
      chai.request(app)
      .put('/api/budget/publish')
      .set('Content-Type', 'application/json')
      .send({id: idBudget})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done(); 
      })
    })
    it("should exclude a budget if has not been excluded", (done) => {
      chai.request(app)
      .put('/api/budget/exclude')
      .set('Content-Type', 'application/json')
      .send({id: idBudget})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done(); 
      })
    })
})
});