import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  GetUsers(page:number) {
    return this.http.get<any>(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/100`
    );
  }
  GetUserById(id:number) {
    return this.http.get<any>(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
    );
  }
  GetUserFriends(page:number,id:number) {
    return this.http.get<any>(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/100`
    );
  }

}
