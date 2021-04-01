import { AccountModel } from '@/domain/models/account'
import { AddAccount } from '@/domain/usescases/account/add-account'
import { Authentication } from '@/domain/usescases/account/authentication'
import faker from 'faker'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
