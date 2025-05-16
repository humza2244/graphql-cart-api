# Design Doc - GraphQL Cart API (Amateur Version)

## 1. High-Level Architecture

**Main Parts:**

* `schema.js`: Defines the types and operations in GraphQL (like CartItem, Cart, etc.)
* `resolver.js`: Contains the logic that runs when the API is called (e.g. adding to cart)
* `data.js`: Stores the cart info in-memory using a Map
* `index.js`: Starts the GraphQL server and handles authentication

**How they connect:**

* The server (`index.js`) uses ApolloServer and passes the schema and resolvers to it.
* When a request hits an endpoint like `addItemToCart`, it runs the logic in `resolver.js`.
* The cart data is saved and read from `data.js`.

---

## 2. Request Flow

### Example: `addItemToCart`

1. Client sends a `mutation` with a token in the headers and item details in the body.
2. Server checks `context.userToken` to identify the user (mock auth).
3. Server looks in `data.js` to find that user’s cart (or creates one).
4. The item is pushed into the cart's items array.
5. The updated cart is saved.
6. Server calculates the new total price and sends back the full cart.

---

## 3. Technology & Data-Model Choices

### Why GraphQL?

* Easy to request just what you need (like only `total`, or only `items.name`)
* Simple schema definitions make it beginner-friendly

### Why In-Memory Storage?

* Faster to build and test
* No setup needed for databases
* Good enough for demo/interview use

### Trade-offs

* Data is gone when server restarts
* Not scalable if many users use it at once

---

## 4. Diagram

```
Client
  |
  |--- Mutation: addItemToCart(input)
  |
  v
Apollo Server (index.js)
  |
  |--- Checks token, creates context.userToken
  |
  v
Resolver (resolver.js)
  |
  |--- Get or create cart in memory
  |--- Push item to cart
  |--- Recalculate total
  |
  v
Returns Cart
```

---

This setup is basic but covers everything the assignment asks for: auth stub, GraphQL API, in-memory storage, validation, and tests.