import { browser, by, element, ExpectedConditions } from 'protractor';
import { PageObjectBase } from './base.po';

export class RegisterPage extends PageObjectBase {
  constructor() {
    super('app-register', '/register');
  }

  waitForError() {
    browser.wait(
        ExpectedConditions.presenceOf(element(by.css('.error'))),
        3000
    );
  }

  getErrorMessage() {
    return element(by.css('.error')).getText();
  }

  enterEMail(email: string) {
    this.enterInputText('#email-input', email);
  }

  enterPassword(password: string) {
    this.enterInputText('#password-input', password);
  }

  clickSignIn() {
    this.clickButton('#submit-btn');
  }
}