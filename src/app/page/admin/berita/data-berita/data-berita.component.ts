import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseRequestsService } from 'src/app/service/firebase-requests.service';
import { StorageEncryptionService } from 'src/app/service/storage-encryption.service';

@Component({
    selector: 'app-data-berita',
    templateUrl: './data-berita.component.html',
    styleUrls: ['./data-berita.component.css']
})
export class DataBeritaComponent implements OnInit, AfterViewInit {

    Berita: any = [];

    constructor(private firebaseRequestService: FirebaseRequestsService,
        private storageEncryptionService: StorageEncryptionService,
        private router: Router) { }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.onFetchAllBerita();
    }

    onFetchAllBerita() {
        this.firebaseRequestService.onFetchBerita()
            .subscribe((_result) => {
                this.Berita = _result;
            })
    }

    onUpdateBerita(news: any) {
        console.log(news);
    }

    onLookBerita(news: any) {
        news.IsHideNavbar = true;

        let data = this.storageEncryptionService.encrypt(JSON.stringify(news));

        this.router.navigate(["/admin/dashboard/detail-berita/", data]);
    }
}
