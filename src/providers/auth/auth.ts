import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient,
              public afAuth: AngularFireAuth,
              public afDB: AngularFireDatabase) {
  
  }

  signupUser(email, password, firstName, lastName): any{    
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser)=> {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
        let uid = authenticatedUser.user.uid;
        let userObject ={
          uid: uid,
          registeredDate: Date.now(),
          name: firstName+ " " +lastName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          photoURL: ""
        };

        newUser.user.updateProfile({
          displayName: firstName + " " +lastName,
          photoURL: ""
        });

        return this.afDB.list('userProfile').update(uid, userObject).then(() => true,
          error => {
            throw new Error(error.message);
        })

        }, error => {
            throw new Error(error.message);
        })

        }, error => {
            throw new Error(error.message);
      });
    }
}
