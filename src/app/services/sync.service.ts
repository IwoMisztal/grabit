import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SyncService {
baseUrl = 'https://localhost:44328/api/project/'
constructor(private http: HttpClient, private storage: Storage) { }

syncToDatabase(projects) {
  console.log(projects);
  return this.http
  .post(this.baseUrl + 'pushprojects', projects).subscribe(q => console.log(q));
}

}
