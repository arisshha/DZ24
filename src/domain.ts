export interface ProductData {
    id: string;
    title: string;
    price: number;
  }
  
  export class Product {
    id: string;
    title: string;
    price: number;
  
    constructor(data: ProductData) {
      this.id = data.id;
      this.title = data.title;
      this.price = data.price;
    }
  }
  
  export interface CartItem {
    product: Product;
    qty: number;
  }
  
  export class Cart {
    private items: CartItem[] = [];
  
    add(product: Product): void {
      const found = this.items.find(it => it.product.id === product.id);
      if (found) {
        found.qty += 1;
      } else {
        this.items.push({ product, qty: 1 });
      }
    }
  
    list(): ReadonlyArray<CartItem> {
      return this.items.map(it => ({ product: it.product, qty: it.qty }));
    }
  
    totalRaw(): number {
      return this.items.reduce((sum, it) => sum + it.product.price * it.qty, 0);
    }
  
    totalWithDiscount(discount: number): number {
      const d = Math.max(0, Math.min(100, discount));
      const result = this.totalRaw() * (1 - d / 100);
      return Math.round(result * 100) / 100;
    }
  
    remove(id: string): void {
      this.items = this.items.filter(it => it.product.id !== id);
    }
  }
  