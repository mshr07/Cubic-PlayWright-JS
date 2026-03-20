export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.banner = page.locator('#welcome-banner');
    this.tasks = page.locator('#task-list li');
  }
}

