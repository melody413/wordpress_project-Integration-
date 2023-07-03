declare module 'colossus' {
  import { Context as KoaContext } from 'koa'

  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  export interface IOContext {
    account: string
    workspace: string
    authToken: string
    params: {
      [param: string]: string
    }
    userAgent: string
    region: string
    route: string
    production: boolean
  }

  export interface ColossusContext extends KoaContext {
    vtex: IOContext
  }
}
