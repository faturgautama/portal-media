import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseRequestsService } from 'src/app/service/firebase-requests.service';
import { StorageEncryptionService } from 'src/app/service/storage-encryption.service';

@Component({
    selector: 'app-portal',
    templateUrl: './portal.component.html',
    styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit, AfterViewInit {

    // ... Navbar
    navbarMenu: any = [];

    // ... Sidebar
    isSidebarOpen: boolean = true;
    sidebarMenu: any = [];

    // ... Popular Posts
    PopularPosts: any = [];

    // ... Berita
    Berita: any = [];

    constructor(private firebaseRequestService: FirebaseRequestsService,
        private storageEncryptionService: StorageEncryptionService,
        private router: Router) {
        this.navbarMenu = [
            { Id: 1, NamaMenu: "Utama", Url: "" },
            { Id: 2, NamaMenu: "Ekonomi" },
            { Id: 3, NamaMenu: "Kesehatan" },
            { Id: 4, NamaMenu: "Keluhan", Url: "input-keluhan" },
            { Id: 4, NamaMenu: "Ilmiah Warga" },
        ];

        this.sidebarMenu = [
            { Id: 1, NamaMenu: "Lifestyle", Url: "/lifestyle" },
            { Id: 2, NamaMenu: "Olahraga", Url: "/sports" },
            { Id: 3, NamaMenu: "Bisnis", Url: "/bisnis" },
            { Id: 4, NamaMenu: "Kesehatan", Url: "/kesehatan" },
            { Id: 5, NamaMenu: "Login", Url: "/admin/login" },
        ];
    }

    ngOnInit(): void {

    }

    ngAfterViewInit() {
        this.onFetchAllBerita();
    }

    onOpenSidebar(args: any) {
        this.isSidebarOpen = !this.isSidebarOpen;
    }

    onFetchAllBerita() {
        this.firebaseRequestService.onFetchAllBerita()
            .subscribe((_result) => {

                // ... Popular Posts
                let isPopularPosts = _result.filter((posts) => {
                    return posts["IsPopularPosts"] == true;
                });

                this.PopularPosts = isPopularPosts.slice(0, 4);

                // ... Berita
                this.Berita = _result;

                console.log(_result);
            })
    }

    onClickReadMore(posts: any) {
        let data = this.storageEncryptionService.encrypt(JSON.stringify(posts));

        this.firebaseRequestService.onGetJumlahVisitUsingIdBerita(posts);

        this.router.navigate(["berita/", data]);
    }
}
