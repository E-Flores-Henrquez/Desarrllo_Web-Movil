const express = require('express');
const cors = require('cors');

const { ApolloServer, gql } = require('apollo-server-express');
const Producto = require('./models/producto');

const typeDefs = gql`
    type Producto{
        id: ID!
        nombre: String!
        precio: Float!
        stock: Int!
    }
    input ProductoInput{
        nombre: String!
        precio: Float!
        stock: Int!
    }
    type Alert{
        message: String
    }
    type Query{
        getProductos: [Producto]
        getProductoById(id: ID!): Producto
    }
    type Mutation{
        addProducto(input: ProductoInput): Producto
        updProducto(id: ID!, input: ProductoInput): Producto
        delProducto(id: ID!): Alert
    }
`;

const resolvers = {
    Query: {
        async getProductos(obj){
            const productos = await Producto.findAll();
            return productos;
        },
        async getProductoById(obj, {id}){
            const productoBus = await Producto.findByPk(id);
            if (productoBus == null){
                return null;
            } else {
                return productoBus;
            }
        }
    },
    Mutation: {
        async addProducto(obj, {input}){
            const producto = await Producto.create(input);
            return producto;
        },
        async updProducto(obj, {id, input}){
            await Producto.update(input, { where: { id: id } });
            const producto = await Producto.findByPk(id);
            return producto;
        },
        async delProducto(obj, {id}){
            await Producto.destroy({ where: { id: id } });
            return {
                message: "Producto Eliminado"
            }
        }
    }
};

let apolloServer = null;
const corsOption = {
    origin: "http://localhost:8091",
    credentials: false
};

const app = express();
app.use(cors());

async function startServer(){
    apolloServer = new ApolloServer({typeDefs, resolvers, corsOption});
    await apolloServer.start();
    apolloServer.applyMiddleware({app, cors: false});
}

startServer();

app.listen(8091, function(){
    console.log("Graphql Iniciado");
});