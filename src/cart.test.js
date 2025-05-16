const resolvers = require('./resolver');

const context = { userToken: 'test123' };

test('createCart returns true', () => {
  const result = resolvers.Mutation.createCart(null, null, context);
  expect(result).toBe(true);
});

test('addItemToCart adds item and returns correct total', () => {
  resolvers.Mutation.createCart(null, null, context);

  const input = {
    id: '1',
    name: 'Apple',
    quantity: 2,
    unitPrice: 1.5
  };

  const result = resolvers.Mutation.addItemToCart(null, { input }, context);

  expect(result.items.length).toBe(1);
  expect(result.total).toBe(3.0);
});

test('updateItemQuantity changes the quantity', () => {
  const input = {
    id: '2',
    name: 'Banana',
    quantity: 1,
    unitPrice: 2
  };

  resolvers.Mutation.addItemToCart(null, { input }, context);

  const updated = resolvers.Mutation.updateItemQuantity(null, {
    itemId: '2',
    quantity: 5
  }, context);

  const updatedItem = updated.items.find(i => i.id === '2');
  expect(updatedItem.quantity).toBe(5);
});

test('removeItem removes the correct item', () => {
  const input = {
    id: '3',
    name: 'Orange',
    quantity: 1,
    unitPrice: 2
  };

  resolvers.Mutation.addItemToCart(null, { input }, context);

  const updated = resolvers.Mutation.removeItem(null, { itemId: '3' }, context);
  const item = updated.items.find(i => i.id === '3');
  expect(item).toBeUndefined();
});

test('clearCart empties the cart', () => {
  const cleared = resolvers.Mutation.clearCart(null, null, context);
  expect(cleared).toBe(true);

  const result = resolvers.Query.getCart(null, null, context);
  expect(result.items.length).toBe(0);
  expect(result.total).toBe(0);
});
