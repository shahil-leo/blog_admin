import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) { }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then((logRef) => {
      this.toastr.success("Logged In SuccessFully")
      this.loggedIn.next(true)
      this.loadUser()
      this.router.navigate(['/'])
    }).catch((error) => {
      this.toastr.warning("You are not a Admin")
    })
  }
  loadUser() {
    this.afAuth.authState.subscribe((user: any) => {
      localStorage.setItem('user', JSON.stringify(user))
    })
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.toastr.success("User Logout SuccessFully")
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.router.navigate(['/login'])
    })
  }

  // we need to access the true and false value because if the user logged out we don't want to show the logout
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

}

// mshahilkv@gmail.com
// 12345678
