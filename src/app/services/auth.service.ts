import { Injectable } from '@angular/core';
import { auth } from '../firebase';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user: any = null;
  isLoaded = false;

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      this.isLoaded = true;
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  logout() {
    return signOut(auth);
  }

  isLoggedIn() {
    return !!this.user;
  }

  onUserChange(callback: (user: any) => void) {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      callback(user);
    });
  }
}