export class AuthClient {
  constructor(request) {
    this.request = request;
  }

  async login(email, password) {
    return this.request.post('/api/auth/login', {
      data: { email, password }
    });
  }

  async refresh(refreshToken) {
    return this.request.post('/api/auth/refresh', {
      data: { refreshToken }
    });
  }
}

