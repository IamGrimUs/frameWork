import axios, { AxiosResponse } from 'axios'

type stingNumberUndefined = string | number | undefined
type Callback = () => void

interface UserProps {
  id?: number
  name?: string
  age?: number
}

export class User {
  events: { [key: string]: Callback[] } = {}

  constructor(private data: UserProps) {}
  get<K extends keyof UserProps>(propName: K): stingNumberUndefined {
    return this.data[propName]
  }
  set(update: UserProps): void {
    Object.assign(this.data, update)
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || []
    handlers.push(callback)
    this.events[eventName] = handlers
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName]
    if (!handlers || handlers.length === 0) {
      return
    }

    handlers.forEach(callback => {
      callback()
    })
  }

  fetch(): void {
    axios.get(`http://localhost:3000/users/${this.get('id')}`).then((response: AxiosResponse): void => {
      this.set(response.data)
    })
  }

  save(): void {
    const id = this.get('id')
    if (id) {
      axios.put(`http://localhost:3000/users/${id}`, this.data)
    } else {
      axios.post('http://localhost:3000/users', this.data)
    }
  }
}
