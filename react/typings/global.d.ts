/* eslint-disable @typescript-eslint/camelcase */
interface Window extends Window {
  dataLayer: any[]
  __SETTINGS__: {
    titleTag: string
  }
}

type PostData = {
  title: WPTitle
  author: WPUser
  content: WPContent
  date: string
  id: number
  slug: string
  excerpt: WPExcerpt
  categories: [WPCategory]
  featured_media: WPMedia
  tags: [WPTag]
}
type WPTitle = {
  raw: string
  rendered: string
}
type WPContent = {
  raw: string
  rendered: string
  protected: bool
}
type WPUser = {
  id: number
  username: string
  name: string
  first_name: string
  last_name: string
  email: string
  url: string
  description: string
  link: string
  locale: string
  nickname: string
  slug: string
  registered_date: string
  roles: [string]
  password: string
  capabilities: [string]
  extra_capabilities: [string]
  avatar_urls: WPAvatarObject
  meta: string
}
type WPCategory = {
  id: number
  slug: string
  count: number
  description: string
  link: string
  name: string
  taxonomy: WPTaxonomyType
  parent: number
  meta: string
}
type WPExcerpt = {
  raw: string
  rendered: string
  protected: bool
}
enum WPTaxonomyType {
  category,
  post_tag,
  nav_menu,
  link_category,
  post_format,
}
type WPAvatarObject = {
  size24: string
  size48: string
  size96: string
}
type WPMedia = {
  date: string
  date_gmt: string
  guid: WPGuid
  id: number
  link: string
  modified: string
  modified_gmt: string
  slug: string
  status: WPStatus
  type: string
  title: WPTitle
  author: number
  comment_status: WPOpenClosed
  ping_status: WPOpenClosed
  meta: string
  template: string
  alt_text: string
  caption: WPContentDescriptor
  description: WPContentDescriptor
  media_type: string
  mime_type: string
  media_details: WPMediaDetails
  post: number
  source_url: string
}
type WPMediaDetails = {
  file: string
  height: number
  image_meta: WPImageMeta
  sizes: [WPMediaSize]
  width: number
}
type WPImageMeta = {
  aperture: string
  camera: string
  caption: string
  copyright: string
  created_timestamp: string
  credit: string
  focal_length: string
  iso: string
  keywords: [string]
  orientation: string
  shutter_speed: string
  title: string
}
type WPMediaSize = {
  file: string
  height: number
  mime_type: string
  slug: string
  source_url: string
  width: number
}
type WPContentDescriptor = {
  raw: string
  rendered: string
  protected: bool
}
enum WPOpenClosed {
  open,
  closed,
}
type WPGuid = {
  raw: string
  rendered: string
}
enum WPStatus {
  publish,
  future,
  draft,
  pending,
  private,
}
type WPTag = {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: WPTaxonomyType
  meta: string
}
