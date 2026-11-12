import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',fullyParallel:true,retries:1,reporter:'list',use:{baseURL:'http://127.0.0.1:4173',trace:'retain-on-failure'},webServer:{command:'npm start',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI},projects:[{name:'chromium',use:{browserName:'chromium'}}]});
