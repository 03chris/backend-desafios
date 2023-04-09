const request = require("supertest")("http://localhost:8080/products");
const expect = require("chai").expect;

describe("Test products", () => {
  describe("GET / ", () => {
    it("status 200", async () => {
      const response = await request.get(`/`);

      expect(response.status).to.eql(200);
    });

    it("Debería retornar un arreglo", async () => {
      const response = await request.get("/");

      expect(typeof response._body).to.eql("object");
    });
  });

  describe("POST /", () => {
    it("Debería agregar un producto", async () => {
      const response = await request.post("/").send({
        name: "Camisa",
        description: "XL",
        photo: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        price: "5000",
        stock: 5
      });

      expect(response.status).to.eql(201);
    });
  });

  describe("DELETE / ", () => {
    it("Debería eliminar un producto", async () => {
      const response = await request.delete("/6432e0aaf6cbc6c54111cdb0");

      expect(response.status).to.eql(200);
    });
  });
});
