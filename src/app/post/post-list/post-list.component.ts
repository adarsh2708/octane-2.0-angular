import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  userList : any;
  constructor(private postService:UserService){}

  ngOnInit(): void {
    this.getPostList();
  }

  getPostList(){
    this.postService.getUserList().subscribe(
      (res) => {
        this.userList = res;
        console.log(this.userList);
      },
      (error) => {

      }
    );
  }

}
