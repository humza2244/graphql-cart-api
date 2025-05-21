// Get access to the cart storage Map from data.js
const data = require('./data');
const carts = data.carts;

// All the resolver functions go in this object
const resolvers = {
  Query: {
    // This function returns the user's cart
    getCart: function(parent, args, context) {
      // Get the user’s token from context (set in index.js)
      const token = context.userToken;

      // Try to get the cart for this user, or use an empty cart
      let cart = carts.get(token);
      if (!cart) {
        cart = { items: [] };
      }

      // Calculate total price of the cart
      let total = 0;
      for (let i = 0; i < cart.items.length; i++) {
        const item = cart.items[i];
        total += item.unitPrice * item.quantity;
      }

      // Return the cart items and total price
      return {
        items: cart.items,
        total: total
      };
    }
  },

  Mutation: {
    // Create a new empty cart for the user
    createCart: function(parent, args, context) {
      const token = context.userToken;
      
      carts.set(token, { items: [] });
      return true;
    },

    // Add an item to the user's cart
    addItemToCart: function(parent, args, context) {
      const token = context.userToken;
      const input = args.input;

      let cart = carts.get(token);
      if (!cart) {
        cart = { items: [] };
      }

      //adds items into the cart
      cart.items.push(input);

      //saves updated cart bac to the map
      carts.set(token, cart);

      let total = 0;
      for (let i = 0; i < cart.items.length; i++) {
        const item = cart.items[i];
        total += item.unitPrice * item.quantity;
      }

      return {
        items: cart.items,
        total: total
      };
    },

    // Change the quantity of an item already in the cart
    updateItemQuantity: function(parent, args, context) {
      const token = context.userToken;
      const itemId = args.itemId;
      const quantity = args.quantity;

      if (quantity < 0) {
        throw new Error("Quantity must be 0 or more");
      }

      const cart = carts.get(token);
      if (!cart) {
        throw new Error("Cart not found");
      }

      let itemFound = false;
      for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].id === itemId) {
          cart.items[i].quantity = quantity;
          itemFound = true;
          break;
        }
      }

      if (!itemFound) {
        throw new Error("Item not found");
      }

      carts.set(token, cart);

      let total = 0;
      for (let i = 0; i < cart.items.length; i++) {
        const item = cart.items[i];
        total += item.unitPrice * item.quantity;
      }

      return {
        items: cart.items,
        total: total
      };
    },

    // Remove an item from the user's cart
    removeItem: function(parent, args, context) {
      const token = context.userToken;
      const itemId = args.itemId;

      const cart = carts.get(token);
      if (!cart) {
        throw new Error("Cart not found");
      }

      let newItems = [];
      let removed = false;

      for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].id !== itemId) {
          newItems.push(cart.items[i]);
        } else {
          removed = true;
        }
      }

      if (!removed) {
        throw new Error("Item not found");
      }

      cart.items = newItems;
      carts.set(token, cart);

      let total = 0;
      for (let i = 0; i < cart.items.length; i++) {
        const item = cart.items[i];
        total += item.unitPrice * item.quantity;
      }

      return {
        items: cart.items,
        total: total
      };
    },

    // Remove everything from the cart
    clearCart: function(parent, args, context) {
      const token = context.userToken;
      carts.set(token, { items: [] });
      return true;
    }

    getItem: function(parent, args, contexts){
      const token = context.userToken;
      const itemId = args.itemId;

      for ()

      
      

    }
  }
};

// Allow other files to use the resolvers
module.exports = resolvers;
