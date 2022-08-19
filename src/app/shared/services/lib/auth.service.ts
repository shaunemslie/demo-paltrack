import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Md5 } from 'ts-md5';

export interface IUser {
  email: string;
  md5?: string;
}

const defaultPath = '/';
const md5 = new Md5();
const defaultUser = {
  email: 'test@gmail.com',
  md5: '',
};

@Injectable()
export class AuthService {
  private _user: IUser | null = defaultUser;
  private _lastAuthenticatedPath: string = defaultPath;
  get loggedIn(): boolean {
    return !!this._user;
  }
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router) {}

  async logIn(email: string, password: string) {
    try {
      this._user = { email, md5: `${md5.appendStr(email).end()}` };
      this.router.navigate([this._lastAuthenticatedPath]);

      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
        message: 'Authentication failed',
      };
    }
  }

  async getUser() {
    try {
      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
        data: null,
      };
    }
  }

  async createAccount(email: string, password: string) {
    try {
      this.router.navigate(['/create-account']);

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to create account',
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to change password',
      };
    }
  }

  async resetPassword(email: string) {
    try {
      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to reset password',
      };
    }
  }

  async logOut() {
    this._user = null;
    this.router.navigate(['/login-form']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode',
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath =
        route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
