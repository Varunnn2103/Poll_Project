import { Injectable } from '@angular/core';
import { PollModel } from './poll-model.model'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  
    private baseUrl = "http://localhost:8080/api/polls";
  
  constructor(private http: HttpClient){

  }

  createPoll(poll: PollModel): Observable<PollModel>{
    return this.http.post<PollModel>(this.baseUrl, poll);
  }

  getPolls():Observable<PollModel[]>{
    return this.http.get<PollModel[]>(this.baseUrl)
  }

  vote(pollId:number, optionId:number): Observable<void>{
    const url = `${this.baseUrl}/vote`;
    return this.http.post<void>(url, {pollId, optionId})

  }
}
