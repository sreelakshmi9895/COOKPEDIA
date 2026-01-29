import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [Header,Footer,FormsModule,RouterLink],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {


  api = inject(ApiService)
  downloadList:any = signal([])
  username:string = ''
  userImage:string = "https://i.pinimg.com/1200x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg"


  ngOnInit(){
    if(sessionStorage.getItem('user')){
      const user = JSON.parse(sessionStorage.getItem('user') || '')
      this.username = user.username
    }
      this.getUserDownloadList()
  }

  getUserDownloadList(){
    this.api.getUserDownloadListAPI().subscribe((res:any)=>{
      this.downloadList.set(res)
      console.log(this.downloadList());
      
    })
  }

}
