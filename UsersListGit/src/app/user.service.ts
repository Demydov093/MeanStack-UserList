import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from './user';
import {Md5} from 'ts-md5/dist/md5';
@Injectable()
export class UserService {

  private _getUrl = '/api/users';
  private _postUrl = '/api/user';
  private _putUrl = '/api/user/';
  private _deleteUrl = '/api/user/';
  constructor(private _http: Http) { }

   getUsers() {
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
   }
   addUser(user: User) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
     user.password = Md5.hashStr(user.password).toString();
    return this._http.post(this._postUrl, JSON.stringify(user), options)
      .map((response: Response) => response.json());
   }
  updateUser(user: User) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this._http.put(this._putUrl + user._id, JSON.stringify(user), options)
      .map((response: Response) => response.json());
  }
  deleteUser(user: User) {
    console.log(user);
    return this._http.delete(this._deleteUrl + user._id)
      .map((response: Response) => response.json());
  }
}
