import { test as base } from '@playwright/test';
import { ApiHelper } from '../utils/api-helper';

type ApiFixtures = {
    apiHelper: ApiHelper;
};

export const test = base.extend<ApiFixtures>({
    apiHelper: async ({ request }, use) => {
        const apiHelper = new ApiHelper(request);

        await use(apiHelper);
    },
});

export { expect } from '@playwright/test';
