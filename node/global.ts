import { ServiceContext } from '@vtex/api'
import { Clients } from './clients'

declare global {
  type Context = ServiceContext<Clients, void>
}
