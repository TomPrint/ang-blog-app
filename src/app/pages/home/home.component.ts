import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { Timestamp } from 'firebase/firestore'; // Import Timestamp from Firebase

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featuredPostsArray: Post[] = []
  latestPostsArray: Post[] = []
  constructor(private postService: PostsService) {

  }

  ngOnInit(): void {
    this.postService.getFeatured().subscribe(val => {
      this.featuredPostsArray = val.map((post: Post) => ({
        ...post,
        createdAt: (post.createdAt as any as Timestamp).toDate()
      }));
    })

    this.postService.loadLatest().subscribe(val => {
      this.latestPostsArray = val.map((post: Post) => ({
        ...post,
        createdAt: (post.createdAt as any as Timestamp).toDate()
      }));
    })
  }

}
