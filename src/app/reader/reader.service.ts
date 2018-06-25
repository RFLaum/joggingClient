import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { User, Role } from '../users/user.model';
import { Week } from '../jogs/week.model';
import { Jog } from '../jogs/jog.model';
import { SelectedService } from '../users/selected.service';
import { UtilityService } from '../utility.service';

interface RawUser {
  username: string,
  id: number,
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class ReaderService {
  user: User;
  private storedPassword: string;
  testPassword: string;

  constructor(private client: HttpClient, private util: UtilityService,
              private sel: SelectedService) {
    this.user = null;
  }

  getId(): number { return this.user.id; }

  loggedIn(): boolean {
    return !!this.user;
  }

  // expandURL(path: string): string {
  //   return "http://localhost:3000/" + path + ".json";
  // }

  tryLogIn(form: NgForm) {
    this.testPassword = form.value.password;
    const obs = this.client.post<RawUser>(this.util.expandURL("login"), form.value);
    obs.subscribe(
      (resp) => this.logIn(resp),
      (err) => {
        alert("Could not log in. Make sure your username and password are correct.");
        form.reset();
      }
    );
  }

  tryRegister(form: NgForm) {
    this.testPassword = form.value.password;
    const obs = this.client.post<RawUser>(this.util.expandURL("users"), {user: form.value});
    obs.subscribe(
      (resp) => this.logIn(resp),
      (err) => {
        //TODO
        form.form.setErrors(err.error);
        alert("Could not register.");
      }
    );
  }

  // getWeeks(pageNum: number): Observable<Week[]>{
  //   const url = this.expandURL("weeklist/" + this.sel.user.id);
  //   const params = {page_num: "" + pageNum};
  //   return this.client.get<Week[]>(url, {params: params})
  // }
  //
  getViewableUsers(): Observable<User[]>{
    return this.client.get<User[]>(this.util.expandURL("users"));
  }
  //
  // updateUser(user: User): Observable<User>{
  //   return this.client.patch<User>(this.userUrl(), user);
  // }
  //
  // deleteUser(): Observable<any> {
  //   return this.client.delete(this.userUrl());
  // }
  //
  // getJogs(pageNum: number): Observable<Jog[]>{
  //   const url = this.jogsUrl();
  //   const params = {page_num: "" + pageNum};
  //   return this.client.get<Jog[]>(url, {params: params});
  // }
  //
  // makeJog(jog: Jog): Observable<Jog>{
  //   return this.client.post<Jog>(this.jogsUrl(), jog);
  // }
  //
  // updateJog(jog: Jog): Observable<Jog>{
  //   return this.client.patch<Jog>(this.jogUrl(jog), jog);
  // }
  //
  // deleteJog(jog: Jog): Observable<any>{
  //   return this.client.delete(this.jogUrl(jog));
  // }

  logOut() {
    this.user = null;
  }

  canSeeOthers(): boolean {
    return this.user.role >= Role.manager;
  }

  getAuth(): string {
    return "Basic " + btoa(this.user.username + ":" + this.storedPassword);
  }

  private logIn(user: RawUser) {
    this.storedPassword = this.testPassword;
    this.user = new User(user.username, user.id, Role[user.role]);
    this.sel.user = this.user;
  }

  // private userUrl(): string {
  //   return this.expandURL("users/" + this.sel.user.id);
  // }
  // private jogsUrl(): string {
  //   return this.userUrl() + "/jogs";
  // }
  // private jogUrl(jog: Jog): string {
  //   return this.jogsUrl() + "/" + jog.id;
  // }
}
