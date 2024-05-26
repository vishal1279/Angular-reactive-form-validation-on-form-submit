import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  userList: any = [];
  candidates: any[] = [];
  filterObj = {
    Name: '',
    ContactNo: '',
    Email: '',
    PageNumber: 1,
    PageSize: 10,
  };
  pageTitle: string = 'Server Side Filter';
  constructor(private usrService: UserService, private http: HttpClient) {
    this.getUsers();
    this.usrService.$refreshTokenReceived.subscribe((res: any) => {
      this.getUsers();
    });
  }

  ngOnInit(): void {
    // this.filetrCandidates('');
  }

  onPrevious() {
    this.filterObj.PageNumber--;
    this.filetrCandidates('');
  }
  onNext() {
    this.filterObj.PageNumber++;
    this.filetrCandidates('');
  }

  filetrCandidates(param: string) {
    this.http
      .post(
        'http://onlinetestapi.gerasim.in/api/OnlineTest/GetCandidatesByFilter',
        this.filterObj
      )
      .subscribe((res: any) => {
        this.candidates = res.data;
      });
  }

  getUsers() {
    this.usrService.getUsers().subscribe((res: any) => {
      this.userList = res.data;
    });
  }
}
