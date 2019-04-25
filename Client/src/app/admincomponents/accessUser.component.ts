import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { adminService } from '../service/app.admin.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { userSchema } from '../models/app.usrshema.model';

@Component({
  selector: 'app-accessUser',
  templateUrl: './accessUser.component.html',
  styleUrls: ['./../css/paper-dashboard.css','./../css/bootstrap.min.css','./../css/demo.css']
})
export class accessUser implements OnInit {

  userdta: Array<userSchema>;
  searchpipe: string;


  constructor(private router:Router , private admnserv:adminService) {
    this.userdta = new Array<userSchema>();
  }

  ngOnInit(): void {

 // this.search();
  };

  search(){
    this.admnserv.getUsrDta().subscribe(
      (resp:Response) => {
        console.log(resp.json().data)
        this.userdta = resp.json().data;
        // console.log(resp.json().data[0]);
        // console.log(resp.json().data[0].FullName.FirstName);
        // console.log(resp.json().data[0].Gender);
      },
      error =>{
        console.log(`Error occured at login :  ${error}`);
      })
  }

  aprvRjctUsr(c,cndtn)
  {
    this.admnserv.rjcaprvUsr(c,cndtn).subscribe(
      (resp:Response) => {
        console.log(resp.json().data)
        this.userdta = resp.json().data;
        alert("Data Updated Sucessfully....!");
      },
      error =>{
        console.log(`Error occured at login :  ${error}`);
      })

  }
}

