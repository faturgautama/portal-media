import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-single-card',
    templateUrl: './single-card.component.html',
    styleUrls: ['./single-card.component.css']
})
export class SingleCardComponent implements OnInit {

    @Input("ImageSingleCard") ImageSingleCard: any;
    @Input("KategoriSingleCard") KategoriSingleCard: any;
    @Input("JudulSingleCard") JudulSingleCard: any;
    @Input("TanggalSingleCard") TanggalSingleCard: any;
    @Input("TotalViewSingleCard") TotalViewSingleCard: any;
    @Input("isAdmin") isAdmin: boolean = false;

    @Output("onUpdateBerita") onUpdateBerita = new EventEmitter<any>();
    @Output("onLookDetailBerita") onLookDetailBerita = new EventEmitter<any>();
    @Output("onClickedReadMore") onClickedReadMore = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void {
    }

    onUpdatingBerita(args: any) {
        this.onUpdateBerita.emit(args);
    }

    onLookingDetailBerita(args: any) {
        this.onLookDetailBerita.emit(args);
    }

    onClickReadMore(args: any) {
        this.onClickedReadMore.emit(args);
    }
}
