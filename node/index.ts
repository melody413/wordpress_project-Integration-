import { queries } from './resolvers/index'
import { postResolvers } from './resolvers/postResolvers'
import { titleResolvers } from './resolvers/titleResolvers'
import { excerptResolvers } from './resolvers/excerptResolvers'
import { captionResolvers } from './resolvers/captionResolvers'
import { categoryResolvers } from './resolvers/categoryResolvers'
import { tagResolvers } from './resolvers/tagResolvers'
import { Service } from '@vtex/api'
import { clients } from './clients'

export default new Service({
  clients,
  graphql: {
    resolvers: {
      Query: {
        ...queries,
      },
      WPPost: {
        ...postResolvers,
      },
      WPTitle: {
        ...titleResolvers,
      },
      WPExcerpt: {
        ...excerptResolvers,
      },
      WPCaption: {
        ...captionResolvers,
      },
      WPCategory: {
        ...categoryResolvers,
      },
      WPTag: {
        ...tagResolvers,
      },
    },
  },
})
