import { randomUUID } from 'node:crypto';

export type RegistrationUser = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  postalCode: string;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  password: string;
};

export function createRegistrationUser(): RegistrationUser {
  return {
    firstName: 'Test',
    lastName: 'Student',
    dateOfBirth: '2000-01-15',
    country: 'KZ',
    postalCode: '041609',
    houseNumber: '40',
    street: 'Test Street',
    city: 'Almaty',
    state: 'Almaty',
    phone: '87000000000',
    email: `sis2-${randomUUID()}@example.com`,
    password: `Study!9-${randomUUID().slice(0, 8)}`,
  };
}