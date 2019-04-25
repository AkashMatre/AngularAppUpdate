import { Component, OnInit, Directive ,ElementRef, ViewChild , HostListener, Attribute, Renderer2 } from '@angular/core';
import { Observable } from "rxjs";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { LoginService } from '../service/app.login.service';
import { User } from '../models/app.user.model';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { valusrname } from './validator';

@Directive({
selector: "[uiImageLoader],[dirtest]",
//selector:"[uiImageLoader]"
})

export class dirctvclass{

 
constructor(@Attribute('loader') public loader: string,private renderer: Renderer2,private el:ElementRef)
{
  // el.nativeElement.style.backgroundColor = 'grey';
  // el.nativeElement.style.color = 'white';  //text color
  this.renderer.setAttribute(this.el.nativeElement, 'src', this.loader);
 
}
@HostListener('mouseenter') onmouseenter(){
  this.highlight('red','white');
}
@HostListener('mouseleave') onmouseleave(){
  this.highlight('green','yellow');
}
@HostListener('load') onLoad() {
  this.renderer.setAttribute(this.el.nativeElement, 'src', this.el.nativeElement.src);
}

private highlight(bgcolor:string,txtcolor:string)
{

  this.el.nativeElement.style.backgroundColor = bgcolor;
  this.el.nativeElement.style.color = txtcolor;
}

}

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.component.html',
  styleUrls: ['./../css/login.css','./../css/paper-dashboard.css','./../css/demo.css','./../css/bootstrap.min.css']

})
export class LoginComponent implements OnInit {

  //var  app = angular.module('mainApp',[]);

  user: User;
  Users:Array<User>;

  form:FormGroup;

  constructor(private router:Router,private loginserv:LoginService, private fb:FormBuilder) {

    this.user = new User("","");
    this.Users = new Array<User>();

    this.form = this.fb.group({
      UserName : ['',valusrname],
      PassWord : ['',valusrname]
    })
    


   }

  ngOnInit(): void {

    // this.form = this.fb.group({
    //   UserName: [null, [Validators.required, Validators.minLength(1)]],
    //   password: [null, Validators.required],
    // });

  }


  login()
  {

    // this.form = this.fb.group({
    //   UserName : ['',valusrname],
    //   PassWord : ''
    // })

    this.loginserv.loginIn(this.user).subscribe(
      (resp:Response) => {

        if(resp.json().data.UserType === "A")
        {
          localStorage.setItem("usrid",resp.json().data.Usr_Id);
          localStorage.setItem("name",resp.json().data.FullName.FirstName);
          localStorage.setItem("usrnm",resp.json().data.UserName);
          localStorage.setItem("pswrd",resp.json().data.PassWord);
          this.router.navigate(['admnHome']);
        }
        else if(resp.json().data.UserType === "O")
        {
          localStorage.setItem("usrid",resp.json().data.Usr_Id);
          localStorage.setItem("name",resp.json().data.FullName.FirstName);
          localStorage.setItem("usrnm",resp.json().data.UserName);
          localStorage.setItem("pswrd",resp.json().data.PassWord);
          this.router.navigate(['oprtrHome']);
        }
        else if(resp.json().data.UserType === "U" && resp.json().data.isAuthorized === "A")
        {
          localStorage.setItem("usrid",resp.json().data.Usr_Id);
          localStorage.setItem("name",resp.json().data.FullName.FirstName);
          localStorage.setItem("usrnm",resp.json().data.UserName);
          localStorage.setItem("pswrd",resp.json().data.PassWord);
          this.router.navigate(['userHome']);
        }
      },
      error =>{
        console.log(`Error occured at login :  ${error}`);
      })
  }

}
