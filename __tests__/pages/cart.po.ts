import { IProduct } from '../interfaces';
import BasePO from './base.po';

class CartPO extends BasePO {
  private readonly cartItem = '.cart_item';
  private readonly cart = {
    name: '.inventory_item_name',
    price: '.inventory_item_price',
    description: '.inventory_item_desc'
  };

  async go() {
    await this.navigate('/cart.html');
  }

  async getCartItems(): Promise<IProduct[]> {
    const result: IProduct[] = [];

    const items = await page.$$(this.cartItem);

    for (const item of items) {
      const name = (await item.$(this.cart.name))!;
      const price = (await item.$(this.cart.price))!;
      const description = (await item.$(this.cart.description))!;

      const priceText = await price.evaluate((ele: HTMLElement) => ele.textContent || '0');

      result.push({
        name: await name.evaluate((ele: HTMLElement) => ele.textContent || ''),
        price: parseFloat(priceText.replace(/\n/g, '').replace('$', '')),
        description: await description.evaluate((ele: HTMLElement) => ele.textContent || '')
      });
    }

    return result;
  }
}

export default new CartPO();
