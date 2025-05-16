# GraphQL Cart API

This is a small shopping cart API built using Node.js and GraphQL. It was created for the Toropal eCommerce technical interview.

## Features

- Create a cart
- Add items to a cart (id, name, quantity, unitPrice)
- View cart contents and total price
- Update the quantity of an item
- Remove an item from the cart
- Clear the cart (bonus)

Each user has their own cart, tracked using a fake token.

## How it works

- Uses Apollo Server for the GraphQL API
- Stores all cart data in memory using a JavaScript Map
- Each user is identified by an "Authorization" token
- Resolvers handle all the logic for reading and updating the cart

## Getting Started

1. Install the dependencies

```bash
npm install
