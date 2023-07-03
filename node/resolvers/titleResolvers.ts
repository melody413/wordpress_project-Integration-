import he = require('he')

export const titleResolvers = {
  rendered: async ({ rendered }: { rendered: string }, _: any, __: any) => {
    return he.decode(rendered)
  },
}
