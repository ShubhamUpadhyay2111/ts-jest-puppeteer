import inventoryPo from './pages/inventory.po';

describe('Inventory', () => {
  beforeEach(async () => {
    await inventoryPo.go();
  });

  it('should have all items with item name, description and price', async () => {
    const products = await inventoryPo.getProducts();

    products.forEach((product) => {
        expect(product.name).toBeTruthy();
        expect(product.price).toBeTruthy();
        expect(product.description).toBeTruthy();
    })
  });
});