/* eslint-disable @typescript-eslint/camelcase */
export const categoryResolvers = {
  wpPosts: async (
    { id }: { id: number },
    {
      page,
      per_page,
      search,
      after,
      author,
      author_exclude,
      before,
      exclude,
      include,
      offset,
      order,
      orderby,
      slug,
      status,
      tags,
      tags_exclude,
      sticky,
    }: {
      page: number
      per_page: number
      search: string
      after: string
      author: [number]
      author_exclude: [number]
      before: string
      exclude: [number]
      include: [number]
      offset: number
      order: string
      orderby: string
      slug: [string]
      status: [string]
      tags: [number]
      tags_exclude: [number]
      sticky: boolean
    },
    ctx: Context
  ) => {
    const {
      clients: { wordpressProxy },
    } = ctx
    const options = {
      categories: [id],
      page,
      per_page,
      search,
      after,
      author,
      author_exclude,
      before,
      exclude,
      include,
      offset,
      order,
      orderby,
      slug,
      status,
      tags,
      tags_exclude,
      sticky,
    }
    const { headers, data } = await wordpressProxy.getPosts(options)
    const posts = data
    const total_count = headers['x-wp-total']
    const result = { posts, total_count }
    return result
  },
}
