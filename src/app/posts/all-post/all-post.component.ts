import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.scss']
})
export class AllPostComponent implements OnInit {

  postArray!: any

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.loadData().subscribe(value => {
      this.postArray = value
    })
  }
  onDelete(imgPath: string, id: string) {
    this.postService.deleteImage(imgPath, id)
  }
  onFeatured(id: string, value: boolean) {
    const featuredData = {
      isFeatured: value
    }
    this.postService.markFeatured(id, featuredData)
  }

}
