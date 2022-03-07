import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseRequestsService } from 'src/app/service/firebase-requests.service';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css'],
    providers: [NgbCarouselConfig]
})
export class CarouselComponent implements OnInit, AfterViewInit {

    images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);

    RecentPosts: any = [];

    constructor(config: NgbCarouselConfig,
        private firebaseRequestsService: FirebaseRequestsService) {

        // customize default values of carousels used by this component tree
        // config.interval = 2000;
        // config.wrap = false;
        // config.keyboard = false;
        // config.pauseOnHover = false;
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
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

                this.RecentPosts = recentPosts.slice(0, 3);
            })
    }
}
