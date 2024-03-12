import { User } from './models/User'

const user = new User({ name: 'new record', age: 1 })
user.save()
