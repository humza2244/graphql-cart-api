const { gql } = require('apollo-server');

const typeDefs = gql`
  type CartItem {
    id: ID! 
    name: String!
    quantity: Int!
    unitPrice: Float!
  }

  type Cart {
    items: [CartItem!]!
    total: Float!
  }

  input CartItemInput {
    id: ID!
    name: String!
    quantity: Int!
    unitPrice: Float!
  }

  type Query {
    getCart: Cart
    getItem(id: ID!): CartItem
  }

  type Mutation {
    createCart: Boolean
    addItemToCart(input: CartItemInput!): Cart
    updateItemQuantity(itemId: ID!, quantity: Int!): Cart
    removeItem(itemId: ID!): Cart
    clearCart: Boolean
  }



`;

module.exports = typeDefs;
