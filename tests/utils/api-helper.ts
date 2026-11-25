
import {
    APIRequestContext,
    APIResponse,
} from '@playwright/test';

export class ApiHelper {
    constructor(private request: APIRequestContext) {}

    async get(url: string): Promise<APIResponse> {
        return await this.request.get(url);
    }

    async post(url: string, data: object): Promise<APIResponse> {
        return await this.request.post(url, { data });
    }

    async put(url: string, data: object): Promise<APIResponse> {
        return await this.request.put(url, { data });
    }

    async patch(url: string, data: object): Promise<APIResponse> {
        return await this.request.patch(url, { data });
    }

    async delete(url: string): Promise<APIResponse> {
        return await this.request.delete(url);
    }
}
