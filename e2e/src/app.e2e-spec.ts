/**
 * Full integration tests
 * @packageDocumentation
 */

import { AppPage } from './app.po';
import { browser, logging } from 'protractor';


describe('weltenbummlerpaar', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should open login modal', () => {
    page.navigateTo();
    page.getElement('nav button').click();
    expect(page.getElement('ngb-modal-window').isDisplayed()).toBe(true);
  });

  afterEach(async () => {
    // assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);

    expect(logs).not.toContain(jasmine.objectContaining(
      {level: logging.Level.SEVERE} as logging.Entry));
  });
});
