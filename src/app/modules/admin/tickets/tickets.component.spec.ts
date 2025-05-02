import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TicketsService } from '@service/tickets.service';
import { QueriesService } from '@service/queries.service';
import { of } from 'rxjs';

import { TicketsComponent } from './tickets.component';
// Mock para TicketsService
const ticketsServiceMock = {
  createTicket: () => of({}), // Puedes ajustar esto según el formato de respuesta esperado
};

// Mock para QueriesService
const queriesServiceMock = {
  getCategories: () => of({}),
  getCountries: () => of({}),
  getPlans: () => of({}),
  getPlatforms: () => of({}),
  getRoles: () => of({}),
};

// Configuración de TestBed con mocks
beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [TicketsComponent],
    imports: [ReactiveFormsModule],
    providers: [
      FormBuilder,
      { provide: TicketsService, useValue: ticketsServiceMock },
      { provide: QueriesService, useValue: queriesServiceMock },
    ],
  }).compileComponents();

  fixture = TestBed.createComponent(TicketsComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

describe('TicketsComponent', () => {
  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketsComponent],
      imports: [ReactiveFormsModule], // Asegúrate de importar ReactiveFormsModule para los formularios reactivos
      providers: [
        FormBuilder,
        {
          provide: TicketsService,
          useValue: { createTicket: () => of({}) } // Mock del servicio TicketsService
        },
        {
          provide: QueriesService,
          useValue: {
            getCategories: () => of({}),
            getCountries: () => of({}),
            getPlans: () => of({}),
            getPlatforms: () => of({}),
            getRoles: () => of({})
          } // Mock del servicio QueriesService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

it('should create a ticket', () => {
  component.newTicket = { title: 'Test Title', description: 'Test Description' };
  component.createTicket();
  expect(component.tickets.length).toBe(1);
});

it('should submit the form', () => {
  spyOn(component.ticketsService, 'createTicket').and.returnValue(of({}));
  component.ticketForm.setValue({
    description: 'Test Description',
    state: false,
    services: '',
    priority: 1,
    message: ''
  });
  component.onSubmit();
  expect(component.ticketsService.createTicket).toHaveBeenCalled();
});

it('should load predefined message', () => {
  component.loadMessage();
  expect(component.message).toEqual(component.predefinedMessage);
});