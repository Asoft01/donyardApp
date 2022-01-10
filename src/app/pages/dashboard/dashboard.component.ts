import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/models/storage-key-constants';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userid: any;
  token: any;

  constructor(private authservice: AuthService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.token = this.localStorageService.getItem('token');
    this.userid = this.localStorageService.getItem('userid');
  }

  logOut(): void {
    this.authservice.logOut();
  }

}
