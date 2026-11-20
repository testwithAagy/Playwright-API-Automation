
import { test, expect } from '../fixtures/api-fixture';

import {
    productSchema,
    productListSchema,
    productErrorSchema,
    createProductResponseSchema,
    updateProductResponseSchema,
    deleteProductResponseSchema,
    emptyProductResponseSchema,
    invalidPriceProductResponseSchema,
} from '../schemas/product.schema';
import productData from '../test-data/products.json';
import { API_ENDPOINTS } from '../constants/api-endpoints';



test('GET all products', async ({ apiHelper }) => {
    const response = await apiHelper.get(API_ENDPOINTS.products);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const validationResult = productListSchema.safeParse(responseBody);

    if (!validationResult.success) {
        console.error(
            'GET all products validation failed:',
            validationResult.error.format()
        );

        throw new Error('GET all products schema validation failed');
    }

    expect(validationResult.data.products.length).toBeGreaterThan(0);

    for (const product of validationResult.data.products) {
        expect(product.id).toBeDefined();
        expect(product.title).toBeDefined();
        expect(product.price).toBeGreaterThan(0);
        expect(product.stock).toBeGreaterThanOrEqual(0);
    }
});



test('GET a single product', async ({ apiHelper }) => {
    const response = await apiHelper.get(
        API_ENDPOINTS.singleProduct(1)
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
   
    const validationResult = productSchema.safeParse(responseBody);

    if (!validationResult.success) {
        console.error(
            'GET single product validation failed:',
            validationResult.error.format()
        );

        throw new Error('GET single product schema validation failed');
    }

    expect(validationResult.data.id).toBe(1);
    expect(validationResult.data.title).toBeDefined();
    expect(validationResult.data.price).toBeGreaterThan(0);
    expect(validationResult.data.stock).toBeGreaterThanOrEqual(0);
    expect(validationResult.data.brand).toBeDefined();
});



test('GET product with invalid ID', async ({ apiHelper }) => {
    const response = await apiHelper.get(
        API_ENDPOINTS.singleProduct(9999)
    );

    expect(response.status()).toBe(404);

    const responseBody = await response.json();

    const validationResult = productErrorSchema.safeParse(responseBody);

    if (!validationResult.success) {
        console.error(
            'GET invalid product validation failed:',
            validationResult.error.format()
        );

        throw new Error(
            'GET invalid product error schema validation failed'
        );
    }

    expect(validationResult.data.message).toBe(
        "Product with id '9999' not found"
    );
});



test('GET product by keyword', async ({ apiHelper }) => {
    const response = await apiHelper.get(
        `${API_ENDPOINTS.searchProducts}?q=phone`
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const validationResult = productListSchema.safeParse(responseBody);

    if (!validationResult.success) {
        console.error(
            'GET product by keyword validation failed:',
            validationResult.error.format()
        );

        throw new Error(
            'GET product by keyword schema validation failed'
        );
    }

    expect(validationResult.data.products.length).toBeGreaterThan(0);

    const productTitles = validationResult.data.products.map(
        (product) => product.title.toLowerCase()
    );

    expect(productTitles).toContain('apple iphone charger');
});



test('GET products with pagination', async ({ apiHelper }) => {
    const response = await apiHelper.get(
        `${API_ENDPOINTS.products}?limit=10&skip=10`
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const validationResult = productListSchema.safeParse(responseBody);

    if (!validationResult.success) {
        console.error(
            'GET products pagination validation failed:',
            validationResult.error.format()
        );

        throw new Error(
            'GET products pagination schema validation failed'
        );
    }

    expect(validationResult.data.products).toHaveLength(10);
    expect(validationResult.data.limit).toBe(10);
    expect(validationResult.data.skip).toBe(10);
    expect(validationResult.data.total).toBeGreaterThan(10);
});



test('POST a new product', async ({ apiHelper }) => {
    const newProduct = productData.newProduct;

    const response = await apiHelper.post(
        API_ENDPOINTS.addProduct,
        newProduct
    );

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    const validationResult = createProductResponseSchema.safeParse(responseBody);

    if (!validationResult.success) {
        console.error(
            'POST product validation failed:',
            validationResult.error.format()
        );

        throw new Error(
            'POST product response schema validation failed'
        );
    }

    expect(validationResult.data.id).toBeDefined();
    expect(validationResult.data.title).toBe(newProduct.title);
    expect(validationResult.data.price).toBe(newProduct.price);
    expect(validationResult.data.category).toBe(newProduct.category);
});


test('PUT update a product', async ({ apiHelper }) => {
    const updatedProduct = productData.updatedProduct;

    const response = await apiHelper.put(
        API_ENDPOINTS.singleProduct(1),
        updatedProduct
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const validationResult = updateProductResponseSchema.safeParse(responseBody);

    if (!validationResult.success) {
        console.error(
            'PUT product validation failed:',
            validationResult.error.format()
        );

        throw new Error(
            'PUT product response schema validation failed'
        );
    }

    expect(validationResult.data.title).toBe(updatedProduct.title);
    expect(validationResult.data.price).toBe(updatedProduct.price);
    expect(validationResult.data.category).toBe(updatedProduct.category);
});



test('PATCH update a product price', async ({ apiHelper }) => {
    const updatedFields = productData.updatedProductPrice;

    const response = await apiHelper.patch(
        API_ENDPOINTS.singleProduct(1),
        updatedFields
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const validationResult = productSchema.safeParse(responseBody);

    if (!validationResult.success) {
        console.error(
            'PATCH product validation failed:',
            validationResult.error.format()
        );

        throw new Error(
            'PATCH product response schema validation failed'
        );
    }

    expect(validationResult.data.id).toBe(1);
    expect(validationResult.data.price).toBe(updatedFields.price);
});



test('DELETE an existing product', async ({ apiHelper }) => {
    const response = await apiHelper.delete(
        API_ENDPOINTS.singleProduct(1)
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const validationResult = deleteProductResponseSchema.safeParse(responseBody);

    if (!validationResult.success) {
        console.error(
            'DELETE product validation failed:',
            validationResult.error.format()
        );

        throw new Error(
            'DELETE product response schema validation failed'
        );
    }

    expect(validationResult.data.id).toBe(1);
    expect(validationResult.data.isDeleted).toBe(true);
    expect(validationResult.data.deletedOn).toBeDefined();
});



test('GET products and validate response headers', async ({ apiHelper }) => {
    const response = await apiHelper.get(API_ENDPOINTS.products);

    expect(response.status()).toBe(200);

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');

    const responseBody = await response.json();
    const validationResult = productListSchema.safeParse(responseBody);

    if (!validationResult.success) {
        console.error(
            'GET products headers validation failed:',
            validationResult.error.format()
        );

        throw new Error(
            'GET products response schema validation failed'
        );
    }

    expect(validationResult.data.products.length).toBeGreaterThan(0);
});




test('GET products with a keyword that has no matches', async ({ apiHelper }) => {
    const response = await apiHelper.get(
        `${API_ENDPOINTS.searchProducts}?q=zzznomatch123`
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const validationResult = productListSchema.safeParse(responseBody);

    if (!validationResult.success) {
        console.error(
            'GET products with no matches validation failed:',
            validationResult.error.format()
        );

        throw new Error(
            'GET products with no matches schema validation failed'
        );
    }

    expect(validationResult.data.products).toHaveLength(0);
});




test('POST a product with an empty request body', async ({ apiHelper }) => {
    const response = await apiHelper.post(
        API_ENDPOINTS.addProduct,
        {}
    );

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    const validationResult = emptyProductResponseSchema.safeParse(responseBody);

    if (!validationResult.success) {
        console.error(
            'POST empty product validation failed:',
            validationResult.error.format()
        );

        throw new Error(
            'POST empty product response schema validation failed'
        );
    }

    expect(validationResult.data.id).toBeDefined();
});



test('POST a product with a string price (DummyJSON behaviour)', async ({ apiHelper }) => {
    const invalidProduct = {
        title: 'Invalid Price Product',
        price: 'not-a-number',
        category: 'Beauty',
    };

    const response = await apiHelper.post(
        API_ENDPOINTS.addProduct,
        invalidProduct
    );

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    const validationResult =
        invalidPriceProductResponseSchema.safeParse(responseBody);

    if (!validationResult.success) {
        console.error(
            'POST invalid price validation failed:',
            validationResult.error.format()
        );

        throw new Error(
            'POST invalid price response schema validation failed'
        );
    }

    expect(validationResult.data.price).toBe('not-a-number');
});
