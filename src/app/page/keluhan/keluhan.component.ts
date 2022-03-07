import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseRequestsService } from 'src/app/service/firebase-requests.service';

@Component({
    selector: 'app-keluhan',
    templateUrl: './keluhan.component.html',
    styleUrls: ['./keluhan.component.css']
})
export class KeluhanComponent implements OnInit {

    formInputKeluhan: FormGroup;

    // ... Navbar
    navbarMenu: any = [];

    // ... Show Loading
    showLoading: boolean = true;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private firebaseRequestsService: FirebaseRequestsService
    ) {
        this.navbarMenu = [
            { Id: 1, NamaMenu: "Utama", Url: "" },
            { Id: 2, NamaMenu: "Ekonomi" },
            { Id: 3, NamaMenu: "Kesehatan" },
            { Id: 4, NamaMenu: "Keluhan", Url: "input-keluhan" },
            { Id: 4, NamaMenu: "Ilmiah Warga" },
        ];

        this.onSetFormInputKeluhanAttribute();
    }

    ngOnInit(): void {
    }

    onSetFormInputKeluhanAttribute() {
        this.formInputKeluhan = this.formBuilder.group({
            "JudulKeluhan": ["", Validators.required],
            "NamaPelapor": ["", Validators.required],
            "AlamatPelapor": ["", Validators.required],
            "NoHandphonePelapor": ["", Validators.required],
            "IsiKeluhan": ["", Validators.required],
            "TujuanKeluhan": ["", Validators.required],
            "IsFinished": [false, Validators.required],
        })
    }

    onSubmitForm(formValue: any) {
        return this.firebaseRequestsService.onPostKeluhan(formValue, this.formInputKeluhan);
    }

    onBackToHome() {
        this.router.navigateByUrl("");
        this.formInputKeluhan.reset();
    }

    get JudulKeluhan() { return this.formInputKeluhan.get("JudulKeluhan") }
    get NamaPelapor() { return this.formInputKeluhan.get("NamaPelapor") }
    get AlamatPelapor() { return this.formInputKeluhan.get("AlamatPelapor") }
    get NoHandphonePelapor() { return this.formInputKeluhan.get("NoHandphonePelapor") }
    get IsiKeluhan() { return this.formInputKeluhan.get("IsiKeluhan") }
    get TujuanKeluhan() { return this.formInputKeluhan.get("TujuanKeluhan") }

}
