import { DbAddAccount } from '@/data/usescases/add-account/db-add-account'
import { AddAccount } from '@/domain/usescases/add-account'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'

export const makeDbAddAccpount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
