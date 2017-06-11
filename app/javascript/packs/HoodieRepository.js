import Hoodie from '@hoodie/client';


export default class HoodieRepository {

  constructor() {
    //this.hoodie = new Hoodie({});
  }

  getCurrentUserData() {
    return Promise.resolve([]);
  }

  signIn(email, password) {
    return Promise.resolve([]);
  }

  isSignedIn(){
    return true;
  }

  deleteAccount() {
    return Promise.resolve([]);
  }

  signUp(email, password) {
    return Promise.resolve([]);
  }

  signOut(){
    return Promise.resolve([]);
  }

  updateUserModules(userModules){
    return Promise.resolve([]);
  }

  isSignedIn() {
    return Promise.resolve([]);
  }
}
