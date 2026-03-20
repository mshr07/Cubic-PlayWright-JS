import { LoginPage } from './LoginPage.js';

export class AuthFlow {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
  }

  async loginAsValidUser() {
    await this.loginPage.goto();
    await this.loginPage.login('student1@example.com', 'Password123');
  }
}

