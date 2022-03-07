import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, observeOn, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class FirebaseRequestsService {

    private httpHeaders: any;

    private pageCount = new BehaviorSubject<number>(0);
    count$ = this.pageCount.asObservable();

    constructor(private httpClient: HttpClient) {
        this.httpHeaders = new HttpHeaders();
        this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');
    }

    // ... Input Berita Service
    onPostBerita(data: any, form: FormGroup) {
        let url = "Berita.json";

        return this.httpClient.post<any>(
            `${environment.firebaseRtdbUrl}` + url,
            data,
            {
                headers: this.httpHeaders
            }
        ).pipe(
            catchError(this.handleError),
            tap((_result) => {
                // console.log(_result);
            })
        ).subscribe((_result) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Data Berhasil Disimpan',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                form.reset();
            }).then(() => {
                this.onPostJumlahVisitUsingIdBerita(_result);
            })
        }, (pesanError) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: pesanError
            });
        })
    }

    // ... Data Berita Service
    onFetchBerita() {
        let url = "Berita.json";

        return this.httpClient.get<any>(
            `${environment.firebaseRtdbUrl}` + url,
            {
                headers: this.httpHeaders
            })
            .pipe(
                catchError(this.handleError),
                map((result: { [key: string]: any }) => {
                    let data = [];

                    for (const key in result) {
                        if (result.hasOwnProperty(key)) {

                            data.push({ ...result[key], id: key })
                        }
                    }

                    return data;
                })
            )
    }

    onFetchAllBerita() {
        return this.onFetchBerita()
            .pipe(
                map((_result) => {
                    let data: any = [];

                    if (_result.length > 0) {
                        for (let posts of _result) {

                            this.onGetJumlahVisitForShowInBerita(posts.id)
                                .subscribe((data) => {
                                    posts.JumlahVisit = data.JumlahVisit;
                                });

                            data.push(posts);
                        }
                    }

                    return data;
                })
            )
    }

    // ... Jumlah Visit
    onPostJumlahVisitUsingIdBerita(data: any) {
        const dataBerita = {
            "JumlahVisit": 0
        };

        return this.httpClient.put<any>(
            `${environment.firebaseRtdbUrl}` + "JumlahVisit/" + data.name + ".json",
            dataBerita,
            {
                headers: this.httpHeaders
            }
        ).pipe(
            tap((_result) => {
                // console.log(_result) 
            })
        ).subscribe((_result) => {
            // console.log(_result);
        });
    }

    onGetJumlahVisitUsingIdBerita(dataBerita: any) {
        let url = "JumlahVisit/" + dataBerita.id + ".json";

        return this.httpClient.get<any>(
            `${environment.firebaseRtdbUrl}` + url,
            {
                headers: this.httpHeaders
            }).pipe(
                catchError(this.handleError),
                map((result) => {
                    return result;
                })
            ).subscribe((_result) => {
                this.onUpdateJumlahVisitUsingIdBerita(_result, dataBerita.id);
            })
    }

    onGetJumlahVisitForShowInBerita(dataBeritaId: any) {
        let url = "JumlahVisit/" + dataBeritaId + ".json";

        return this.httpClient.get<any>(
            `${environment.firebaseRtdbUrl}` + url,
            {
                headers: this.httpHeaders
            })
            .pipe(
                catchError(this.handleError),
                map((result) => {
                    return result;
                })
            )
    }

    onUpdateJumlahVisitUsingIdBerita(data: any, key: string) {
        const updateData = {
            "JumlahVisit": data.JumlahVisit + 1
        }

        return this.httpClient.patch<any>(
            `${environment.firebaseRtdbUrl}` + "JumlahVisit/" + key + ".json",
            updateData,
            {
                headers: this.httpHeaders
            }
        ).subscribe();
    }

    onPostKeluhan(data: any, form: FormGroup) {
        let url = "KeluhanWarga.json";

        return this.httpClient.post<any>(
            `${environment.firebaseRtdbKeluhanUrl}` + url,
            data,
            {
                headers: this.httpHeaders
            }
        ).pipe(
            catchError(this.handleError),
        ).subscribe((_result) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Terima Kasih',
                text: 'Keluhan Anda Akan Segera Kami Proses',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                form.reset();
            })
        }, (pesanError) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: pesanError
            });
        })
    }

    onFetchAllKeluhan() {
        let url = "KeluhanWarga.json";

        return this.httpClient.get<any>(
            `${environment.firebaseRtdbKeluhanUrl}` + url,
            {
                headers: this.httpHeaders
            })
            .pipe(
                catchError(this.handleError),
                map((result: { [key: string]: any }) => {
                    let data = [];

                    for (const key in result) {
                        if (result.hasOwnProperty(key)) {

                            data.push({ ...result[key], KeluhanId: key })
                        }
                    }

                    return data;
                })
            )
    }

    onShowLoading() {
        let timerInterval: any;

        Swal.fire({
            title: 'Loading...',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            showCancelButton: false,
            willOpen: () => {
                Swal.showLoading();
                timerInterval = setInterval(() => {
                    const content = Swal.getContent();
                    if (content) {
                        const b: any = content.querySelector('b');

                        if (b) {
                            b.textContent = Swal.getTimerLeft()
                        }
                    }
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((alertResponse) => {
            if (alertResponse.dismiss === Swal.DismissReason.timer) {

            };
        });
    }

    private handleError(httpErrorResponse: HttpErrorResponse) {
        let pesanError = 'An Error Occured!';

        if (httpErrorResponse.error)
            return throwError(pesanError);
    }
}
