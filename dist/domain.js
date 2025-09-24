"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = exports.Product = void 0;
class Product {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.price = data.price;
    }
}
exports.Product = Product;
class Cart {
    constructor() {
        this.items = [];
    }
    add(product) {
        const found = this.items.find(it => it.product.id === product.id);
        if (found) {
            found.qty += 1;
        }
        else {
            this.items.push({ product, qty: 1 });
        }
    }
    list() {
        return this.items.map(it => ({ product: it.product, qty: it.qty }));
    }
    totalRaw() {
        return this.items.reduce((sum, it) => sum + it.product.price * it.qty, 0);
    }
    totalWithDiscount(discount) {
        const d = Math.max(0, Math.min(100, discount));
        const result = this.totalRaw() * (1 - d / 100);
        return Math.round(result * 100) / 100;
    }
    remove(id) {
        this.items = this.items.filter(it => it.product.id !== id);
    }
}
exports.Cart = Cart;
