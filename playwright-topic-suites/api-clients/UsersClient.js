export class UsersClient {
  constructor(request) {
    this.request = request;
  }

  async getAll() {
    return this.request.get('/api/users');
  }

  async create(user) {
    return this.request.post('/api/users', { data: user });
  }
}

