import React, { Fragment } from 'react'
import { useQuery } from 'react-apollo'
import { defineMessages } from 'react-intl'
import { Spinner } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

import WordpressTeaser from './WordpressTeaser'
import Settings from '../graphql/Settings.graphql'
import TagPosts from '../graphql/TagPosts.graphql'

const CSS_HANDLES = [
  'relatedPostsBlockContainer',
  'relatedPostsBlockTitle',
  'relatedPostsBlockFlex',
  'relatedPostsBlockFlexItem',
] as const

const WordpressRelatedPostsBlock: StorefrontFunctionComponent<WPRelatedPostsBlockProps> = ({
  productQuery,
  title,
  useTextOverlays,
  showCategories,
  showDates,
  showAuthors,
  showExcerpts,
  numberOfPosts,
}) => {
  const { loading: loadingS, data: dataS } = useQuery(Settings)
  const { loading, error, data } = useQuery(TagPosts, {
    skip: !productQuery?.product?.productReference,
    variables: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      wp_per_page: numberOfPosts,
      tag: 'prod-' + productQuery?.product?.productReference,
    },
  })
  const handles = useCssHandles(CSS_HANDLES)
  return productQuery?.product?.productReference ? (
    <div className={`${handles.relatedPostsBlockContainer} pv4 pb9`}>
      {(loading || loadingS) && <Spinner />}
      {error && <Fragment />}
      {data?.wpTags?.tags[0]?.wpPosts &&
      'prod-' + productQuery.product.productReference ==
        data.wpTags.tags[0].name ? (
        <Fragment>
          <h2 className={`${handles.relatedPostsBlockTitle} tc t-heading-2`}>
            {title}
          </h2>
          <div
            className={`${handles.relatedPostsBlockFlex} mv4 flex flex-row flex-wrap justify-between`}
          >
            {data.wpTags.tags[0].wpPosts.posts.map(
              (post: PostData, index: number) => (
                <div
                  key={index}
                  className={`${handles.relatedPostsBlockFlexItem} mv3 w-33-l ph2 w-100-s`}
                >
                  <WordpressTeaser
                    title={post.title.rendered}
                    date={post.date}
                    id={post.id}
                    slug={post.slug}
                    author={post.author != null ? post.author.name : ''}
                    excerpt={post.excerpt.rendered}
                    category={post.categories[0]?.name ?? ''}
                    categoryId={post.categories[0]?.id ?? undefined}
                    categorySlug={post.categories[0]?.slug ?? ''}
                    image={post.featured_media?.source_url ?? ''}
                    altText={post.featured_media?.alt_text ?? ''}
                    mediaType={post.featured_media?.media_type ?? ''}
                    showCategory={showCategories}
                    showDate={showDates}
                    showAuthor={showAuthors}
                    showExcerpt={showExcerpts}
                    useTextOverlay={useTextOverlays}
                    settings={dataS.appSettings}
                  />
                </div>
              )
            )}
          </div>
        </Fragment>
      ) : (
        <Fragment />
      )}
    </div>
  ) : null
}

interface WPRelatedPostsBlockProps {
  title: string
  numberOfPosts: number
  useTextOverlays: boolean
  showCategories: boolean
  showDates: boolean
  showAuthors: boolean
  showExcerpts: boolean
  productQuery: ProductQuery
}

interface ProductProperties {
  name: string
  values: [string]
}

interface ProductImage {
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string
}

interface ProductOffer {
  Installments: [ProductInstallment]
  Price: number
  ListPrice: number
  AvailableQuantity: number
}

interface ProductInstallment {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  Name: string
}

interface ProductSeller {
  sellerId: string
  commertialOffer: ProductOffer
}

interface ProductItem {
  itemId: string
  name: string
  images: [ProductImage]
  sellers: [ProductSeller]
}

interface ProductShape {
  productId: string
  productName: string
  description: string
  properties: [ProductProperties]
  productReference: string
  brand: string
  items: [ProductItem]
  sellers: [ProductSeller]
}

interface ProductQuery {
  product: ProductShape
  loading: boolean
}

WordpressRelatedPostsBlock.defaultProps = {
  title: 'Related Articles',
  numberOfPosts: 3,
  useTextOverlays: false,
  showCategories: true,
  showDates: true,
  showAuthors: false,
  showExcerpts: false,
}

const messages = defineMessages({
  title: {
    defaultMessage: '',
    id: 'admin/editor.wordpressRelatedPosts.title',
  },
  description: {
    defaultMessage: '',
    id: 'admin/editor.wordpressRelatedPosts.description',
  },
  titleTitle: {
    defaultMessage: '',
    id: 'admin/editor.wordpressRelatedPostsTitle.title',
  },
  titleDescription: {
    defaultMessage: '',
    id: 'admin/editor.wordpressRelatedPostsTitle.description',
  },
  numberOfPostsTitle: {
    defaultMessage: '',
    id: 'admin/editor.wordpressNumberOfPosts.title',
  },
  numberOfPostsDescription: {
    defaultMessage: '',
    id: 'admin/editor.wordpressNumberOfPosts.description',
  },
  useTextOverlaysTitle: {
    defaultMessage: '',
    id: 'admin/editor.wordpressOverlays.title',
  },
  useTextOverlaysDescription: {
    defaultMessage: '',
    id: 'admin/editor.wordpressOverlays.description',
  },
  showCategoriesTitle: {
    defaultMessage: '',
    id: 'admin/editor.wordpressCategories.title',
  },
  showCategoriesDescription: {
    defaultMessage: '',
    id: 'admin/editor.wordpressCategories.description',
  },
  showDatesTitle: {
    defaultMessage: '',
    id: 'admin/editor.wordpressDates.title',
  },
  showDatesDescription: {
    defaultMessage: '',
    id: 'admin/editor.wordpressDates.description',
  },
  showAuthorsTitle: {
    defaultMessage: '',
    id: 'admin/editor.wordpressAuthors.title',
  },
  showAuthorsDescription: {
    defaultMessage: '',
    id: 'admin/editor.wordpressAuthors.description',
  },
  showExcerptsTitle: {
    defaultMessage: '',
    id: 'admin/editor.wordpressExcerpts.title',
  },
  showExcerptsDescription: {
    defaultMessage: '',
    id: 'admin/editor.wordpressExcerpts.description',
  },
})

WordpressRelatedPostsBlock.schema = {
  title: messages.title.id,
  description: messages.description.id,
  type: 'object',
  properties: {
    title: {
      title: messages.titleTitle.id,
      description: messages.titleDescription.id,
      type: 'string',
      isLayout: false,
      default: '',
    },
    numberOfPosts: {
      title: messages.numberOfPostsTitle.id,
      description: messages.numberOfPostsDescription.id,
      type: 'number',
      isLayout: false,
      default: 3,
    },
    useTextOverlays: {
      title: messages.useTextOverlaysTitle.id,
      description: messages.useTextOverlaysDescription.id,
      type: 'boolean',
      isLayout: false,
      default: false,
    },
    showCategories: {
      title: messages.showCategoriesTitle.id,
      description: messages.showCategoriesDescription.id,
      type: 'boolean',
      isLayout: false,
      default: true,
    },
    showDates: {
      title: messages.showDatesTitle.id,
      description: messages.showDatesDescription.id,
      type: 'boolean',
      isLayout: false,
      default: true,
    },
    showAuthors: {
      title: messages.showAuthorsTitle.id,
      description: messages.showAuthorsDescription.id,
      type: 'boolean',
      isLayout: false,
      default: false,
    },
    showExcerpts: {
      title: messages.showExcerptsTitle.id,
      description: messages.showExcerptsDescription.id,
      type: 'boolean',
      isLayout: false,
      default: false,
    },
  },
}

export default WordpressRelatedPostsBlock
