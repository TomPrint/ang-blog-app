import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { Timestamp } from 'firebase/firestore'; // Import Timestamp from Firebase

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {
  postArray: Post[] = [];
  categoryObj: any;

  constructor(private route: ActivatedRoute, private postService: PostsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.categoryObj = val;
      this.postService.loadCategoryPost(val['id']).subscribe(post => {
        // Map createdAt to a JavaScript Date object for each post
        this.postArray = post.map((p: Post) => ({
          ...p,
          createdAt: (p.createdAt as any as Timestamp).toDate()
        }));
      });
    });
  }
}

