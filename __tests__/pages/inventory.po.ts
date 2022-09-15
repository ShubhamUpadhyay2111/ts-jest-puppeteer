import { IProduct } from '../interfaces';
import BasePO from './base.po';

class InventoryPO extends BasePO {
  private readonly productItem = '.inventory_item';
  private readonly addCart = '.btn_inventory';
  private readonly cartCount = '.shopping_cart_badge';
  private readonly product = {
    name: '.inventory_item_name',
    price: '.inventory_item_price',
    description: '.inventory_item_desc'
  };
  private readonly menuToggle = '#react-burger-menu-btn';
  private readonly allItems = '#inventory_sidebar_link';
  private readonly about = '#about_sidebar_link';
  private readonly logout = '#logout_sidebar_link';
  private readonly resetAppState = '#reset_sidebar_link';
  private readonly closeMenu = '#react-burger-cross-btn';


  async go() {
    await this.navigate('/inventory.html');

    if (!(await this.isInventoryPage())) {
      await this.autoLogin();
      await this.navigate('/inventory.html');
    }
  }

  async isInventoryPage(): Promise<boolean> {
    const title = await this.getElementTextBySelector('.title');
    return title.toUpperCase() === 'PRODUCTS' && page.url().includes('/inventory.html');
  }

  async toggleMenu(menuOption: string): Promise<void> {
    await page.click(this.menuToggle);
    
    switch(menuOption) {
      case 'About': {
        await page.click(this.about);
        break;
      }
      case 'Log Out': {
        await page.click(this.logout);
        break;
      }
      case 'Reset App State': {
        await page.click(this.resetAppState);
        break;
      }
      default: {
        await page.click(this.allItems);
        break;
      }
    }

    await page.click(this.closeMenu);
  }

  async getProducts(): Promise<IProduct[]> {
    const result: IProduct[] = [];

    const items = await page.$$(this.productItem);

    for (const item of items) {
      const name = (await item.$(this.product.name))!;
      const price = (await item.$(this.product.price))!;
      const description = (await item.$(this.product.description))!;

      const priceText = await this.getElementText(price);

      result.push({
        name: await this.getElementText(name),
        price: parseFloat(priceText.replace(/\n/g, '').replace('$', '')),
        description: await this.getElementText(description),
      });
    }

    return result;
  }

  async addItemToCart(productName: string): Promise<void> {
    const items = await page.$$(this.productItem);

    for (const item of items) {
      const name = await this.getElementText((await item.$(this.product.name))!);

      if (name === productName) {
        await (await item.$(this.addCart))?.click();
      }
    }
  }

  async getCartCount(): Promise<number> {
    const cart = await page.$(this.cartCount);
    if (!cart) {
      return 0;
    }

    const cartCountText: string = await this.getElementText(cart);
    return parseInt(cartCountText || '0');
  }
}

export default new InventoryPO();
