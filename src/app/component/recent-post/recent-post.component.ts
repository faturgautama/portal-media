import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FirebaseRequestsService } from 'src/app/service/firebase-requests.service';

@Component({
    selector: 'app-recent-post',
    templateUrl: './recent-post.component.html',
    styleUrls: ['./recent-post.component.css']
})
export class RecentPostComponent implements OnInit, AfterViewInit {

    @Input("isTransparent") isTransparent: boolean = false;

    RecentPosts: any = [];

    @Input("isFooter") isFooter: boolean = false;

    constructor(private firebaseRequestsService: FirebaseRequestsService) { }

    ngOnInit(): void {

    }

    ngAfterViewInit() {
        this.onFetchRecentPosts();
    }

    onFetchRecentPosts() {
        // ... Set Start Date
        let startDate = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));

        // ... Set End Date
        let endDate = new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000));

        this.firebaseRequestsService.onFetchAllBerita()
            .subscribe((_result) => {
                let recentPosts = _result.filter((posts) => {
                    return (new Date(posts.TanggalBerita) >= startDate && new Date(posts.TanggalBerita) <= endDate)
                })

                if (this.isFooter) {
                    this.RecentPosts = recentPosts.slice(0, 3);
                } else {
                    this.RecentPosts = recentPosts;
                }
            })
    }
}
