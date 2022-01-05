export default class User {
  email: string;
  ID: string;

  private _token: string;
  private _tokenExpiration: Date;

  constructor(email: string, ID: string, token: string, tokenExpiration: Date) {
    this.email = email;
    this.ID = ID;
    this._token = token;
    this._tokenExpiration = tokenExpiration;
  }

  get token() {
    if (!this._token || this._tokenExpiration < new Date()) {
      return;
    }

    return this._token;
  }
}
