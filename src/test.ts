/**
 * Global unit testing setup
 * @packageDocumentation
 */

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';


declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// initialize Angular testing environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// find all unit tests
const context = require.context('./', true, /\.spec\.ts$/);

// load modules
context.keys().map(context);
