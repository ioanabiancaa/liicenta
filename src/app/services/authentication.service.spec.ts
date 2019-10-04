import { TestBed, async } from '@angular/core/testing';

import * as firebase from 'firebase/app';

import { AuthenticationService } from './authentication.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { resolve, reject } from 'q';
import { LoginPage } from '../login/login.page';

class FirebaseAuthMock{
  currentUser: any;
  userMap: any = {};

  createUserWithEmailAndPassword(username, password){
    return new Promise((resolve, reject) => {
      if (username && username.includes('@')) {
        this.userMap[username] = { email: username, password };
        resolve({ email: username, password});
      } else {
        reject(new Error('Invalid email or password'));
      }
    });
  }

  signInWithEmailAndPassword(username, password){
    return new Promise((resolve, reject) => {
      if (this.userMap[username]){
        if(this.userMap[username].password === password){
          this.currentUser = { email: username, password };
          resolve({ email: username, password});
        } else {
          reject(new Error('Invalid credentials'));
        }
      } else {
        reject(new Error('Invalid credentials'));
      }
    });
  }

  signOut(username, password) {
    this.currentUser = null;
    return Promise.resolve();
  }
}

class FirebaseAppMock{
  auth: FirebaseAuthMock;

  constructor(){
    this.auth = new FirebaseAuthMock();
  }
}
describe('AuthenticationService', () => {
  let authService: AuthenticationService;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
      ],
      providers: [{provide: AngularFireAuth, useClass: FirebaseAppMock}]
    }).compileComponents();
    authService = TestBed.get(AuthenticationService);
  }));

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe ('users details ', () =>{
    const email = 'test@test.com';
    const password = '12345';
    
    it('should be undefined before login ', () => {
      expect(authService.userDetails()).toBeUndefined();
    });

    it('should returun the logged in user', async () => {
      await authService.registerUser({email, password});
      expect(await authService.loginUser({email, password})).toEqual({email, password});
      expect(authService.userDetails()).toBeDefined();
    });

    it('should return null after logout ', async () => {
      await authService.registerUser({email, password});
      expect(await authService.loginUser({ email, password})).toEqual({email, password});
      expect(authService.userDetails()).toBeDefined();
      await authService.logoutUser();
      expect(authService.userDetails()).toBeNull();
    });
  });

  describe('register user',  () => {
    it('should succeed for valid emails', async () => {
      const email = 'test@test.com';
      const password = 'abcdef';
      expect(await authService.registerUser({ email, password })).toEqual({ email, password });
    });

    it('should fail for invalid emails', async () => {
      const email = 'test';
      const password = 'abcdef';
      try {
        await authService.registerUser({ email, password });
        expect(false).toBeTruthy();
      } catch (err) {
        expect(err.message).toEqual('Invalid email or password');
      }
    });
  });

  describe('login user',  () => {
    const email = 'test@test.com';
    const password = 'abcdef';

    it('should succeed for registered users entering with valid credentials', async () => {
      await authService.registerUser({ email, password });
      expect(await authService.loginUser({ email, password })).toEqual({ email, password });
    });

    it('should fail for registered users entering invalid credentials', async () => {
      await authService.registerUser({ email, password });
      try {
        await authService.loginUser({ email, password: 'a' });
        expect(false).toBeTruthy();
      } catch (err) {
        expect(err.message).toEqual('Invalid credentials');
      }
    });

    it('should fail for unregistered users', async () => {
      try {
        await authService.loginUser({ email, password });
        expect(false).toBeTruthy();
      } catch (err) {
        expect(err.message).toEqual('Invalid credentials');
      }
    });
  });
});
