/* eslint @typescript-eslint/no-explicit-any: 0 */
/* Typings for `render-runtime` */
declare module 'vtex.render-runtime' {
  import { Component, ReactElement } from 'react'

  export interface NavigationOptions {
    page?: string
    to?: string
    params?: any
    fallbackToWindowLocation?: boolean
  }

  export interface RenderContext {
    culture: {
      locale: string
      currency: string
    }
    getSettings: (app: string) => any
    navigate: (options: NavigationOptions) => void
  }

  export interface RenderContextProps {
    runtime: {
      account: string
      navigate: (options: NavigationOptions) => void
    }
  }

  export interface InjectedRuntime {
    runtime: RenderRuntime
  }

  interface Pages {
    [name: string]: Page
  }

  interface Route {
    domain: string
    blockId: string
    canonicalPath?: string
    id: string
    params: Record<string, string>
    path: string
    title?: string
  }

  interface Culture {
    availableLocales: string[]
    locale: string
    language: string
    country: string
    currency: string
  }

  export interface RenderRuntime {
    account: string
    accountId: string
    appsEtag: string
    workspace: string
    disableSSR: boolean
    hints: {
      desktop: boolean
      mobile: boolean
      phone: boolean
      tablet: boolean
    }
    page: string
    route: Route
    version: string
    culture: Culture
    pages: Pages
    preview: boolean
    production: boolean
    publicEndpoint: string
    renderMajor: number
    query?: Record<string, string>
    start: boolean
    runtimeMeta: {
      version: string
      config?: any
    }
    settings: {
      [app: string]: any
    }
    segmentToken: string
    rootPath?: string
    workspaceCookie: string
    hasNewExtensions: boolean
    navigate: (options: NavigationOptions) => void
  }

  export const Link: any
  export const NoSSR: any
  export const RenderContextConsumer: ReactElement
  export const canUseDOM: boolean
  export const withRuntimeContext: any
  export const Helmet: any
  export const useRuntime: () => RenderRuntime
}
