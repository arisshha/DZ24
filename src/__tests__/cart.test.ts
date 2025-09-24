/// <reference types="jest" />
import { Cart, Product } from '../domain';

test('add + list', () => {
  const cart = new Cart();
  const a = new Product({ id: 'a', title: 'A', price: 100 });
  const b = new Product({ id: 'b', title: 'B', price: 50 });

  cart.add(a); cart.add(a); cart.add(b);

  const items = cart.list();
  expect(items).toHaveLength(2);
  expect(items.find(i => i.product.id === 'a')?.qty).toBe(2);
  expect(items.find(i => i.product.id === 'b')?.qty).toBe(1);
});

test('totalRaw', () => {
  const cart = new Cart();
  cart.add(new Product({ id: 'a', title: 'A', price: 200 }));
  cart.add(new Product({ id: 'b', title: 'B', price: 50 }));
  cart.add(new Product({ id: 'b', title: 'B', price: 50 }));
  expect(cart.totalRaw()).toBe(300);
});

test('totalWithDiscount', () => {
  const cart = new Cart();
  cart.add(new Product({ id: 'a', title: 'A', price: 100 }));
  cart.add(new Product({ id: 'b', title: 'B', price: 100 }));

  expect(cart.totalWithDiscount(20)).toBe(160);
  expect(cart.totalWithDiscount(0)).toBe(200);
  expect(cart.totalWithDiscount(100)).toBe(0);
  expect(cart.totalWithDiscount(200)).toBe(0);   // clamp >100 → 100%
  expect(cart.totalWithDiscount(-50)).toBe(200); // clamp <0 → 0%
});

test('remove', () => {
  const cart = new Cart();
  const a = new Product({ id: 'a', title: 'A', price: 100 });
  const b = new Product({ id: 'b', title: 'B', price: 50 });

  cart.add(a); cart.add(b); cart.add(b);
  cart.remove('b');

  const items = cart.list();
  expect(items).toHaveLength(1);
  expect(items[0].product.id).toBe('a');

  cart.remove('nope'); // не падает
  expect(cart.list()).toHaveLength(1);
});
