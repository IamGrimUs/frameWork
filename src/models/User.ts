type stingNumberUndefined = string | number | undefined
type Callback = () => void

interface UserProps {
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
}
