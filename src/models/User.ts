import { Eventing } from './Eventing'
import { Sync } from './Sync'

type stingNumberUndefined = string | number | undefined
export interface UserProps {
  id?: number
  name?: string
  age?: number
}

const baseUrl = 'http://localhost:3000/users'
export class User {
  public events: Eventing = new Eventing()
  public sync: Sync<UserProps> = new Sync<UserProps>(baseUrl)
  constructor(private data: UserProps) {}

  get<K extends keyof UserProps>(propName: K): stingNumberUndefined {
    return this.data[propName]
  }
  set(update: UserProps): void {
    Object.assign(this.data, update)
  }
}
