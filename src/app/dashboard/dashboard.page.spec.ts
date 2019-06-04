import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPage } from './dashboard.page';

import { DebugElement } from '@angular/core';
import { BrowserModule,By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, NavController} from '@ionic/angular';



describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports:[ 
        BrowserModule,
        IonicModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
    de = fixture.debugElement.query(By.css('ion-button')); 
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have title `Dashboard`', () => {
    expect(component.title).toEqual('Dashboard');
  });

  // it('should disable the create button ', () => {
  //   expect(el.hasAttribute('disabled')).toBeTruthy();
  // });

});
