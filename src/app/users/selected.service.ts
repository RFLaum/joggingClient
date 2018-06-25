import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Week } from '../jogs/week.model';
import { Jog, BareJog } from '../jogs/jog.model';
import { User } from './user.model';
import { UtilityService } from '../utility.service';

@Injectable({
  providedIn: 'root'
})
export class SelectedService {
  private inUser: User;
  private inNumJogs: number;
  jogUpdated = new EventEmitter<{id: number, jog: Jog}>();
  jogCreated = new EventEmitter<Jog>();

  constructor(private util: UtilityService, private client: HttpClient) { }

  get numJogs(): number { return this.inNumJogs; }
  get user(): User { return this.inUser; }

  set user(newUser: User){
    this.inUser = newUser;
    const obs = this.client.get<number>(
      this.util.expandURL("jogcount/" + this.inUser.id)
    );
    obs.subscribe(
      (resp) => this.inNumJogs = resp,
      (err) => {/* TODO */}
    )
  }

  getWeeks(pageNum: number): Observable<Week[]>{
    const url = this.util.expandURL("weeklist/" + this.inUser.id);
    const params = {page_num: "" + pageNum};
    return this.client.get<Week[]>(url, {params: params})
  }

  getViewableUsers(): Observable<User[]>{
    return this.client.get<User[]>(this.util.expandURL("users"));
  }

  updateUser(user: User): Observable<User>{
    return this.client.patch<User>(this.userUrl(), user);
  }

  deleteUser(): Observable<any> {
    return this.client.delete(this.userUrl());
  }

  getJogs(pageNum: number): Observable<Jog[]>{
    const url = this.jogsUrl();
    const params = {page_num: "" + pageNum};
    return this.client.get<Jog[]>(url, {params: params});
  }

  makeJog(jog: BareJog, errFunc?: (HttpErrorResponse) => void) {
    const obs = this.client.post<Jog>(this.jogsUrl(), {jog: jog});
    obs.subscribe((resp) => this.jogCreated.emit(resp), errFunc);
  }

  updateJog(jog: BareJog, errFunc?: (HttpErrorResponse) => void){
    const obs = this.client.patch<Jog>(this.jogUrl(jog), {jog: jog});
    obs.subscribe(
      (resp) => this.jogUpdated.emit({id: resp.id, jog: resp}),
      errFunc);
  }

  deleteJog(jog: Jog | BareJog, errFunc?: (HttpErrorResponse) => void) {
    const obs = this.client.delete(this.jogUrl(jog));
    obs.subscribe(
      () => this.jogUpdated.emit({id: jog.id, jog: null}),
      errFunc
    );
  }

  private userUrl(): string {
    return this.util.expandURL("users/" + this.inUser.id);
  }
  private jogsUrl(): string {
    return this.userUrl() + "/jogs";
  }
  private jogUrl(jog: Jog | BareJog): string {
    return this.jogsUrl() + "/" + jog.id;
  }
}
