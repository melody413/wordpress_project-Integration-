import sanitizeHtml = require('sanitize-html')

export const captionResolvers = {
  rendered: async ({ rendered }: { rendered: string }, _: any, __: any) => {
    return sanitizeHtml(rendered, { allowedTags: [] })
  },
}
