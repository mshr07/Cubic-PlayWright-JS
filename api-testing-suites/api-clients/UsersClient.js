export class UsersClient {
  constructor(request) {
    this.request = request;
  }

  async list() {
    return this.request.get('/api/users');
  }

  async create(data) {
    return this.request.post('/api/users', { data });
  }

  async getById(id) {
    return this.request.get(`/api/users/${id}`);
  }
}

