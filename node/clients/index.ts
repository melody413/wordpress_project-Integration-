import { ClientsConfig, IOClients, LRUCache } from '@vtex/api'
import WordpressProxyDataSource from './wordpressProxy'

const TIMEOUT_MS = 8000

const defaultClientOptions = {
  retries: 2,
  timeout: TIMEOUT_MS,
}

const cacheStorage = new LRUCache<string, any>({ max: 5000 })
// eslint-disable-next-line no-undef
metrics.trackCache('wordpressProxy', cacheStorage)

export class Clients extends IOClients {
  public get wordpressProxy(): WordpressProxyDataSource {
    return this.getOrSet('wordpressProxy', WordpressProxyDataSource)
  }
}

export const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: defaultClientOptions,
    wordpressProxy: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Vtex-Use-Https': 'true',
      },
      memoryCache: cacheStorage,
    },
  },
}
