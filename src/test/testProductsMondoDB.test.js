const productsTest = require("../controller/products/containerProducts.js");
const assert = require("assert");

describe(`Test sobre MondoDB`, () => {
  it(`Debería obtener todos los productos`, async () => {
    const allProducts = await productsTest.getProductsDB()

    assert(allProducts.length > 0);
  });

   it(`Debería crear un producto`, async () => {

     const allProductsBefore = await productsTest.getProductsDB();

     const newProduct = {
       name: "Camisa",
       description: "XL",
       photo: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
       price: "5000",
       stock: 5
     };

     await productsTest.saveDB(newProduct);

     const allProductsAfter = await productsTest.getProductsDB();

     assert(allProductsAfter.length > allProductsBefore.length);
   });

   it(`Debería modificar un producto`, async () => {
     const id = `6432e55dbbe573aece853508`;

     const productBefore = await productsTest.getByIdDB(id);
     console.log(`productBefore`);
     console.log(productBefore);

     const productUpdate = await productsTest.updateProductDB(
       id,
       `Nombre modificado`,
       `Descripción modificada`,
       `URL`,
       5000,
       5
     );
     console.log(`productUpdate`);
     console.log(productUpdate);

     assert(productBefore.name != productUpdate.name);
   });

   it(`Debería borrar un producto`, async () => {
     const allProductsBefore = await productsTest.getProductsDB();

     await productsTest.deleteProductDB(`6432e097f6cbc6c54111cdae`);

     const allProductsAfter = await productsTest.getProductsDB();

     assert(allProductsBefore.length > allProductsAfter.length);
   });
});
