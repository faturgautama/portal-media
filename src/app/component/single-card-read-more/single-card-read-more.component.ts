import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-single-card-read-more',
    templateUrl: './single-card-read-more.component.html',
    styleUrls: ['./single-card-read-more.component.css']
})
export class SingleCardReadMoreComponent implements OnInit, AfterViewInit {

    @Input("ImageSingleCard") ImageSingleCard: any;
    @Input("KategoriSingleCard") KategoriSingleCard: any;
    @Input("JudulSingleCard") JudulSingleCard: any;
    @Input("TanggalSingleCard") TanggalSingleCard: any;
    @Input("TotalViewSingleCard") TotalViewSingleCard: any;
    @Input("IsiBeritaSingleCard") IsiBeritaSingleCard: any;
    @Input("DeskripsiBeritaSingleCard") DeskripsiBeritaSingleCard: any;

    @Output("onClickedReadMore") onClickedReadMore = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void {
        console.log(this.IsiBeritaSingleCard);
    }

    ngAfterViewInit() {
    }

    onClickReadMore(args: any) {
        this.onClickedReadMore.emit(args);
    }

}
