import { AddAccountParams } from '@/domain/usescases/account/add-account'
import { AccountModel } from '@/domain/models/account'

export interface AddAccountRepository {
  add: (data: AddAccountParams) => Promise<AccountModel>
}
