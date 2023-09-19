import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { Timestamp } from 'firebase/firestore'; 

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  postData: any;
  similarPostArray: Post[] = [];

  constructor(private route: ActivatedRoute, private postService: PostsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.postService.countViews(val['id'])
      this.postService.loadOnePost(val['id']).subscribe(post => {
        // Map createdAt to a JavaScript Date object
        this.postData = {
          ...post,
          createdAt: (post.createdAt as any as Timestamp).toDate()
        };
        this.loadSimilarPost(this.postData.category.categoryId);
      });
    });
  }

  loadSimilarPost(catId: string) {
    this.postService.loadSimilar(catId).subscribe(val => {
      this.similarPostArray = val.map((post: Post) => ({
        ...post,
        createdAt: (post.createdAt as any as Timestamp).toDate()
      }));
    });
  }
}
