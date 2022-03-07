import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FirebaseRequestsService } from 'src/app/service/firebase-requests.service';

@Component({
    selector: 'app-keluhan-warga',
    templateUrl: './keluhan-warga.component.html',
    styleUrls: ['./keluhan-warga.component.css']
})
export class KeluhanWargaComponent implements OnInit, AfterViewInit {

    Keluhan: any = [];

    Detail: any = [];

    constructor(private firebaseRequestsService: FirebaseRequestsService) { }

    ngOnInit(): void {

    }

    ngAfterViewInit() {
        this.onFetchKeluhan();
    }

    onFetchKeluhan() {
        this.firebaseRequestsService.onFetchAllKeluhan()
            .subscribe((_result) => {
                this.Keluhan = _result;
            })
    }

    onLihatDetailKeluhan(keluhan: any) {
        this.Detail = keluhan;
    }
}
