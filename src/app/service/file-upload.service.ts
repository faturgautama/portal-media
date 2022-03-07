import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../model/file-upload-model';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    private basePath = "/uploads";

    constructor(private storage: AngularFireStorage) { }

    pushFileToStorage(fileUpload: FileUpload): Observable<any> {
        const filePath = `${this.basePath}/${fileUpload.file.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, fileUpload.file);

        let DownloadUrl: any;

        uploadTask.snapshotChanges()
            .pipe(
                finalize(() => {
                    storageRef.getDownloadURL()
                        .subscribe(downloadUrl => {
                            fileUpload.url = downloadUrl;
                            fileUpload.name = fileUpload.file.name;

                            DownloadUrl = downloadUrl;
                        });
                })
            ).subscribe(
                (url) => {
                    if (url) {
                        console.log(url);
                    }
                }, (pesanError) => {
                    console.log(pesanError);
                }
            );

        return DownloadUrl;
    }

    private saveFileData(fileUpload: FileUpload): void {
        console.log(fileUpload);
    }

}
