db.createCollection("messages");
db.createCollection("products");

const mensajes = [
  { text: "Hola George", time: "14:17", user: "Chris" },
  { text: "Como estas?", time: "14:19", user: "Jorge" },
  { text: "Todo bien", time: "14:20", user: "Chris" },
  { text: "Que paso?", time: "14:21", user: "Jorge" },
  { text: "Hiciste el desafio?", time: "14:22", user: "Chris" },
  { text: "Estoy en eso", time: "14:22", user: "Jorge" },
  { text: "Necesitas ayuda?", time: "14:23", user: "Chris" },
  { text: "Si porfa", time: "14:23", user: "Jorge" },
  { text: "Avisame y vamos al ds", time: "14:25", user: "Chris" },
  { text: "Estoy", time: "14:45", user: "Jorge" },
];
db.messages.insertMany(mensajes);

const productos = [
  { title: "Remera", price: 100, photo: "url" },
  { title: "Jean", price: 100, photo: "url" },
  { title: "Ojotas", price: 100, photo: "url" },
  { title: "Zapatillas", price: 100, photo: "url" },
  { title: "Gorra", price: 100, photo: "url" },
  { title: "Anillo", price: 100, photo: "url" },
  { title: "Pulsera", price: 100, photo: "url" },
  { title: "Short", price: 100, photo: "url" },
  { title: "Camisa", price: 100, photo: "url" },
  { title: "Campera", price: 100, photo: "url" },
];
db.products.insertMany(productos);

db.products.update({ title: "Remera" }, { $set: { price: 120 } });
db.products.update({ title: "Jean" }, { $set: { price: 250 } });
db.products.update({ title: "Ojotas" }, { $set: { price: 300 } });
db.products.update({ title: "Zapatillas" }, { $set: { price: 750 } });
db.products.update({ title: "Gorra" }, { $set: { price: 900 } });
db.products.update({ title: "Anillo" }, { $set: { price: 1500 } });
db.products.update({ title: "Pulsera" }, { $set: { price: 2000 } });
db.products.update({ title: "Short" }, { $set: { price: 3500 } });
db.products.update({ title: "Camisa" }, { $set: { price: 4200 } });
db.products.update({ title: "Campera" }, { $set: { price: 4900 } });

db.products.find();
db.messages.find();

db.products.count();
db.messages.count();

const newProduct = { title: "Buzo", price: 100, photo: "url" };
db.products.insertOne(newProduct);
db.products.find();

db.products.update({ title: "Buzo" }, { $set: { price: 500 } });

db.products.find({ price: { $lt: 1000 } });
db.products.find({ price: { $gt: 1000, $lt: 3000 } });
db.products.find({ price: { $gt: 3000 } });
db.products.find().sort({ price: 1 }).skip(3).limit(1);
db.products.updateMany({}, { $set: { stock: 100 } });
db.products.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } });
db.products.deleteMany({ price: { $lt: 1000 } });

db.createUser({
  user: "pepe",
  pwd: "asd456",
  roles: [{ role: "read", db: "ecommerce" }],
});
