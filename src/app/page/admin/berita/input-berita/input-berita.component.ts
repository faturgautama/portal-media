import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { HtmlEditorService, ImageService, LinkService, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { finalize } from 'rxjs/operators';
import { FileUpload } from 'src/app/model/file-upload-model';
import { FirebaseRequestsService } from 'src/app/service/firebase-requests.service';

@Component({
    selector: 'app-input-berita',
    templateUrl: './input-berita.component.html',
    styleUrls: ['./input-berita.component.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class InputBeritaComponent implements OnInit {

    formInputBerita: FormGroup;
    JumlahParagraphIsiBerita: number;

    selectedPhoto: FileList;
    currentFileUpload: FileUpload;

    fileDownloadUrl: any;

    toolbarsRTE: object = {
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
            'LowerCase', 'UpperCase', 'SuperScript', 'SubScript', '|',
            'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
            'Outdent', 'Indent', '|',
            'CreateTable', 'CreateLink', 'Image', 'FileManager', '|', 'ClearFormat', 'Print',
            'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
    };


    @ViewChild("ParagraphTextBox") ParagraphTextBox: NumericTextBoxComponent;

    private basePath = "/uploads/berita";

    constructor(private formBuilder: FormBuilder,
        private storage: AngularFireStorage,
        private firebaseRequestService: FirebaseRequestsService,) { }

    ngOnInit(): void {
        this.onSetFormGroup();
    }

    //... On Set Form Group 
    onSetFormGroup() {
        this.formInputBerita = this.formBuilder.group({
            JudulBerita: ["", Validators.required],
            TanggalBerita: [new Date(), Validators.required],
            IdKategoriBerita: ["", Validators.required],
            KategoriBerita: ["", Validators.required],
            FotoBerita: ["", Validators.required],
            DeskripsiSingkat: ["", Validators.required],
            IsiBerita: ["", Validators.required],
            LokasiBerita: ["", Validators.required],
            AuthorBerita: ["", Validators.required],
            IsPopularPosts: [false, Validators.required],
            IsPublished: [true, Validators.required],
            UserEntry: ["Admin", []],
            WaktuEntry: [new Date(), []],
        });
    }

    onChangeKategoriBerita(args: any) {
        let text = args.target.selectedOptions[0].text;

        this.KategoriBerita.setValue(text);
    }

    onChangePopularPosts(args: any) {
        let isChecked = args.target.checked;

        this.IsPopularPosts.setValue(isChecked);
    }

    onChangePublishedPosts(args: any) {
        let isChecked = args.target.checked;

        this.IsPublished.setValue(isChecked);
    }

    onSubmitForm(formValue: any) {
        this.uploadFotoBerita(formValue);
    }

    onChangeFoto(args: any) {
        this.selectedPhoto = args.target.files;
    }

    uploadFotoBerita(dataBerita: any) {
        const file = this.selectedPhoto.item(0);
        this.selectedPhoto = undefined;

        this.currentFileUpload = new FileUpload(file);

        this.pushFileToStorage(this.currentFileUpload, dataBerita);
    }

    pushFileToStorage(fileUpload: FileUpload, dataBerita: any) {
        const filePath = `${this.basePath}/${fileUpload.file.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, fileUpload.file);

        uploadTask.snapshotChanges()
            .pipe(
                finalize(() => {
                    storageRef.getDownloadURL()
                        .subscribe(downloadUrl => {
                            fileUpload.url = downloadUrl;
                            fileUpload.name = fileUpload.file.name;

                            this.fileDownloadUrl = downloadUrl;

                            dataBerita.FotoBerita = this.fileDownloadUrl;

                            this.onPostBerita(dataBerita);
                        });
                })
            ).subscribe((_result) => {
                // console.log(_result);
            }, (error) => {
                console.log(error);
            })
    }

    onPostBerita(data: any) {
        this.firebaseRequestService.onPostBerita(data, this.formInputBerita);
    }

    get TanggalBerita() { return this.formInputBerita.get("TanggalBerita") }
    get IdKategoriBerita() { return this.formInputBerita.get("IdKategoriBerita") }
    get KategoriBerita() { return this.formInputBerita.get("KategoriBerita") }
    get FotoBerita() { return this.formInputBerita.get("FotoBerita") }
    get IsiBerita() { return this.formInputBerita.get("IsiBerita") }
    get DeskripsiSingkat() { return this.formInputBerita.get("DeskripsiSingkat") }
    get JudulBerita() { return this.formInputBerita.get("JudulBerita") }
    get LokasiBerita() { return this.formInputBerita.get("LokasiBerita") }
    get AuthorBerita() { return this.formInputBerita.get("AuthorBerita") }
    get IsPopularPosts() { return this.formInputBerita.get("IsPopularPosts") }
    get IsPublished() { return this.formInputBerita.get("IsPublished") }
}
