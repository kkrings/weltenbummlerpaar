/**
 * Global test setup
 * @packageDocumentation
 */

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';


declare const require: any;

// initialize the Angular testing environment
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

// find all the tests
const context = require.context('./', true, /\.spec\.ts$/);

// load the modules
context.keys().map(context);
