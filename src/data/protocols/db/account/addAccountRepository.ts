import { AddAccount } from '@/domain/usescases/account/add-account'
import { AccountModel } from '@/domain/models/account'

export interface AddAccountRepository {
  add: (data: AddAccountRepository.Params) => Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
  export type Params = AddAccount.Params
  export type Result = AccountModel
}
