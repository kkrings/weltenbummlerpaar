/**
 * Authentication end-to-end testing
 * @packageDocumentation
 */

import { AppPage } from '../app.po';
import * as utils from '../app-utils.po';


describe('authentication:', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
  });

  beforeAll(() => {
    page.navigateToRoot();
  });

  describe('before admin is logged in', () => {
    it('login button should be displayed', () => {
      expect(page.loginButton.isDisplayed()).toBeTruthy();
    });

    it('logout button should not be present', () => {
      expect(page.logoutButton.isPresent()).toBeFalsy();
    });

    it('open diary entry form button should not be present', () => {
      expect(page.openDiaryEntryFormButton.isPresent()).toBeFalsy();
    });
  });

  describe('after admin is logged in', () => {
    beforeAll(() => {
      utils.loginAdmin(page);
    });

    it('login button should not be displayed', () => {
      expect(page.loginButton.isDisplayed()).toBeFalsy();
    });

    it('logout button should be present', () => {
      expect(page.logoutButton.isPresent()).toBeTruthy();
    });

    it('open diary entry form button should be present', () => {
      expect(page.openDiaryEntryFormButton.isPresent()).toBeTruthy();
    });

    describe('after admin is logged out', () => {
      beforeAll(() => {
        page.logoutAdmin();
      });

      it('login button should be displayed', () => {
        expect(page.loginButton.isDisplayed()).toBeTruthy();
      });

      it('logout button should not be present', () => {
        expect(page.logoutButton.isPresent()).toBeFalsy();
      });

      it('open diary entry form button should not be present', () => {
        expect(page.openDiaryEntryFormButton.isPresent()).toBeFalsy();
      });
    });
  });

  afterAll(utils.checkBrowserLogsForErrors);
});
