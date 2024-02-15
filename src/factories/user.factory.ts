import { RegisterUser } from '../models/user.models';
import { faker } from '@faker-js/faker';

export default function randomUserData(): RegisterUser {
  const registerUserData: RegisterUser = {
    firstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    lastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    email: '',
    password: faker.internet.password(),
  };

  registerUserData.email = faker.internet.email({
    firstName: registerUserData.firstName,
    lastName: registerUserData.lastName,
  });

  return registerUserData;
}
