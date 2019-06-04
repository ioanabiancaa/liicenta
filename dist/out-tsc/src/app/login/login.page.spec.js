import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
describe('LoginPage', function () {
    var component;
    var fixture;
    var de;
    var el;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [LoginPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                BrowserModule,
                ReactiveFormsModule,
                FormsModule,
                IonicModule,
                RouterTestingModule
            ],
            providers: [FormBuilder]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('form invalid when empty', function () {
        //component.validations_form.controls['email'].setValue('');
        //component.validations_form.controls['password'].setValue('');
        expect(component.validations_form.valid).toBeFalsy();
    });
});
//# sourceMappingURL=login.page.spec.js.map