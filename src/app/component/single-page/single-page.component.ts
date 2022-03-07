import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Berita } from 'src/app/model/berita.model';
import { StorageEncryptionService } from 'src/app/service/storage-encryption.service';

@Component({
    selector: 'app-single-page',
    templateUrl: './single-page.component.html',
    styleUrls: ['./single-page.component.css']
})
export class SinglePageComponent implements OnInit, AfterViewInit {

    KategoriSinglePage: string;
    JudulSinglePage: string;
    TanggalSinglePage: any;
    KotaSinglePage: any;
    AuthorSinglePage: any;
    IsiBeritaSinglePage: any = [];
    ImageSinglePage: any;

    // ... Navbar
    navbarMenu: any = [];
    @Input("hideNavbar") hideNavbar: boolean = false;

    // ... Sidebar
    isSidebarOpen: boolean = true;
    sidebarMenu: any = [];

    showLoading: boolean = true;

    constructor(private activatedRoute: ActivatedRoute,
        private storageEncryptionService: StorageEncryptionService) {
        this.navbarMenu = [
            { Id: 1, NamaMenu: "Utama" },
            { Id: 2, NamaMenu: "Ekonomi" },
            { Id: 3, NamaMenu: "Kesehatan" },
            { Id: 4, NamaMenu: "Keluhan" },
            { Id: 4, NamaMenu: "Ilmiah Warga" },
        ];

        this.sidebarMenu = [
            { Id: 1, NamaMenu: "Lifestyle", Url: "/lifestyle" },
            { Id: 2, NamaMenu: "Olahraga", Url: "/sports" },
            { Id: 3, NamaMenu: "Bisnis", Url: "/bisnis" },
            { Id: 4, NamaMenu: "Kesehatan", Url: "/kesehatan" },
        ];
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.onGetNavigationExtras();
        }, 500);

        this.onShowLoading();
    }

    onGetNavigationExtras() {
        let navigationExtras = JSON.parse(
            this.storageEncryptionService.decrypt(
                this.activatedRoute.snapshot.params["data"]
            ));

        this.KategoriSinglePage = navigationExtras.KategoriBerita;
        this.JudulSinglePage = navigationExtras.JudulBerita;
        this.TanggalSinglePage = navigationExtras.TanggalBerita;
        this.KotaSinglePage = navigationExtras.LokasiBerita;
        this.AuthorSinglePage = navigationExtras.AuthorBerita;
        this.IsiBeritaSinglePage = navigationExtras.IsiBerita;
        this.ImageSinglePage = navigationExtras.FotoBerita;
        this.hideNavbar = navigationExtras.IsHideNavbar;
    }

    onOpenSidebar(args: any) {
        this.isSidebarOpen = !this.isSidebarOpen;
    }

    onShowLoading() {
        setTimeout(() => {
            this.showLoading = false;
        }, 900);
    }
}
