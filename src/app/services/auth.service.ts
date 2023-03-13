import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) { }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then((logRef) => {
      this.toastr.success("Logged In SuccessFull")
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

}

// mshahilkv@gmail.com
// 12345678
