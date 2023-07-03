import { ExternalClient, InstanceOptions, IOContext, Apps } from '@vtex/api'

export default class WordpressProxyDataSource extends ExternalClient {
  public endpoint?: string

  public constructor(context: IOContext, options?: InstanceOptions) {
    super(``, context, options)
  }

  private async getEndpoint(vtex: IOContext) {
    const apps = new Apps(vtex)
    const appId = process.env.VTEX_APP_ID as string
    const settings = await apps.getAppSettings(appId)
    const endpoint = settings.endpoint || 'http://demo.wp-api.org/'
    this.endpoint = endpoint + 'wp-json/wp/v2/'
    return
  }

  private buildArgs(wpOptions: any) {
    var returnStr = ''
    var keys = Object.keys(wpOptions)
    var len = keys.length
    for (var i = 0; i < len; i++) {
      if (wpOptions[keys[i]] != undefined) {
        returnStr +=
          (returnStr != '' ? '&' : '') + keys[i] + '=' + wpOptions[keys[i]]
      }
    }
    if (returnStr != '') returnStr = '?' + returnStr
    return returnStr
  }

  public async getPosts(wpOptions?: any) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    var combinedArgs = ''
    if (wpOptions) {
      combinedArgs = this.buildArgs(wpOptions)
    }

    return this.http.getRaw(this.endpoint + `posts` + combinedArgs, {
      metric: 'posts' + combinedArgs,
    })
  }

  public async getPost(id: number, password?: string) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    var formattedPassword = ''
    if (password != null) formattedPassword = '?password=' + password

    return this.http.get(this.endpoint + `posts/` + id + formattedPassword, {
      metric: 'post' + id + formattedPassword,
    })
  }

  public async getCategories(wpOptions?: any) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    var combinedArgs = ''
    if (wpOptions) {
      combinedArgs = this.buildArgs(wpOptions)
    }

    return this.http.getRaw(this.endpoint + `categories` + combinedArgs, {
      metric: 'categories' + combinedArgs,
    })
  }

  public async getCategory(id: number) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    return this.http.get(this.endpoint + `categories/` + id, {
      metric: 'category' + id,
    })
  }

  public async getTags(wpOptions?: any) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    var combinedArgs = ''
    if (wpOptions) {
      combinedArgs = this.buildArgs(wpOptions)
    }

    return this.http.getRaw(this.endpoint + `tags` + combinedArgs, {
      metric: 'tags' + combinedArgs,
    })
  }

  public async getTag(id: number) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    return this.http.get(this.endpoint + `tags/` + id, { metric: 'tag' + id })
  }

  public async getPages(wpOptions?: any) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    var combinedArgs = ''
    if (wpOptions) {
      combinedArgs = this.buildArgs(wpOptions)
    }

    return this.http.getRaw(this.endpoint + `pages` + combinedArgs, {
      metric: 'pages' + combinedArgs,
    })
  }

  public async getPage(id: number, password?: string) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    var formattedPassword = ''
    if (password != null) formattedPassword = '?password=' + password

    return this.http.get(this.endpoint + `pages/` + id + formattedPassword, {
      metric: 'page' + id + formattedPassword,
    })
  }

  public async getComments(wpOptions?: any) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    var combinedArgs = ''
    if (wpOptions) {
      combinedArgs = this.buildArgs(wpOptions)
    }

    return this.http.getRaw(this.endpoint + `comments` + combinedArgs, {
      metric: 'comments' + combinedArgs,
    })
  }

  public async getComment(id: number, password?: string) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    var formattedPassword = ''
    if (password != null) formattedPassword = '?password=' + password

    return this.http.get(this.endpoint + `comments/` + id + formattedPassword, {
      metric: 'comment' + id + formattedPassword,
    })
  }

  public async getTaxonomies(type?: string) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    var formattedType = ''
    if (type != null) formattedType = '?type=' + type
    return this.http.get(this.endpoint + `taxonomies` + formattedType, {
      metric: 'taxonomies' + formattedType,
    })
  }

  public async getTaxonomy(taxonomy: string) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    return this.http.get(this.endpoint + `taxonomies/` + taxonomy, {
      metric: 'taxonomy' + taxonomy,
    })
  }

  public async getMedia(wpOptions?: any) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    var combinedArgs = ''
    if (wpOptions) {
      combinedArgs = this.buildArgs(wpOptions)
    }

    return this.http.getRaw(this.endpoint + `media` + combinedArgs, {
      metric: 'media' + combinedArgs,
    })
  }

  public async getMediaSingle(id: number) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    return this.http.get(this.endpoint + `media/` + id, {
      metric: 'media-single' + id,
    })
  }

  public async getUsers(wpOptions?: any) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    var combinedArgs = ''
    if (wpOptions) {
      combinedArgs = this.buildArgs(wpOptions)
    }

    return this.http.getRaw(this.endpoint + `users` + combinedArgs, {
      metric: 'users' + combinedArgs,
    })
  }

  public async getUser(id: number) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    return this.http.get(this.endpoint + `users/` + id, { metric: 'user' + id })
  }

  public async getPostTypes() {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    return this.http.get(this.endpoint + `types`, { metric: 'post-types' })
  }

  public async getPostType(type: string) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    return this.http.get(this.endpoint + `types/` + type, {
      metric: 'post-type' + type,
    })
  }

  public async getPostStatuses() {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    return this.http.get(this.endpoint + `statuses`, {
      metric: 'post-statuses',
    })
  }

  public async getPostStatus(status: string) {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    return this.http.get(this.endpoint + `statuses/` + status, {
      metric: 'post-status' + status,
    })
  }

  public async getSettings() {
    if (typeof this.endpoint === 'undefined') {
      await this.getEndpoint(this.context)
    }
    return this.http.get(this.endpoint + `settings`, { metric: 'settings' })
  }
}
