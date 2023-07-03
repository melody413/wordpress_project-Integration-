import React, { Fragment } from 'react'
import { useQuery } from 'react-apollo'
import { defineMessages } from 'react-intl'
import { Spinner } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

import WordpressTeaser from './WordpressTeaser'
import Settings from '../graphql/Settings.graphql'
import AllPosts from '../graphql/AllPosts.graphql'

const CSS_HANDLES = [
  'latestPostsBlockContainer',
  'latestPostsBlockTitle',
  'latestPostsBlockFlex',
  'latestPostsBlockFlexFirstColumnItem',
  'latestPostsBlockFlexSecondColumn',
  'latestPostsBlockFlexSecondColumnItem',
  'latestPostsBlockFlexItem',
] as const

const WordpressLatestPostsBlock: StorefrontFunctionComponent<WPLatestPostsBlockProps> = ({
  title,
  twoColumns,
  useTextOverlays,
  showCategories,
  showDates,
  showAuthors,
  showExcerpts,
  numberOfPosts,
}) => {
  const { loading: loadingS, data: dataS } = useQuery(Settings)
  const { loading, error, data } = useQuery(AllPosts, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    variables: { wp_per_page: numberOfPosts },
  })
  const handles = useCssHandles(CSS_HANDLES)
  return (
    <div className={`${handles.latestPostsBlockContainer} pv4 pb9`}>
      {(loading || loadingS) && <Spinner />}
      {error && <span>Error: {error.message}</span>}
      {data?.wpPosts ? (
        <Fragment>
          <h2 className={`${handles.latestPostsBlockTitle} tc t-heading-2`}>
            {title}
          </h2>
          <div
            className={`${handles.latestPostsBlockFlex} mv4 flex flex-row flex-wrap justify-between`}
          >
            {twoColumns ? (
              <Fragment>
                <div
                  key={0}
                  className={`${handles.latestPostsBlockFlexFirstColumnItem} w-two-thirds mv3 ph2 w-100-s`}
                >
                  <WordpressTeaser
                    title={data.wpPosts.posts[0].title.rendered}
                    date={data.wpPosts.posts[0].date}
                    id={data.wpPosts.posts[0].id}
                    slug={data.wpPosts.posts[0].slug}
                    author={data.wpPosts.posts[0].author?.name ?? ''}
                    excerpt={data.wpPosts.posts[0].excerpt.rendered}
                    category={data.wpPosts.posts[0].categories[0]?.name ?? ''}
                    categoryId={
                      data.wpPosts.posts[0].categories[0]?.id ?? undefined
                    }
                    categorySlug={
                      data.wpPosts.posts[0].categories[0]?.slug ?? ''
                    }
                    image={
                      data.wpPosts.posts[0].featured_media?.source_url ?? ''
                    }
                    altText={
                      data.wpPosts.posts[0].featured_media?.alt_text ?? ''
                    }
                    mediaType={
                      data.wpPosts.posts[0].featured_media?.media_type ?? ''
                    }
                    showCategory={showCategories}
                    showDate={showDates}
                    showAuthor={showAuthors}
                    showExcerpt={showExcerpts}
                    useTextOverlay={useTextOverlays}
                    settings={dataS.appSettings}
                  />
                </div>
                <div
                  className={`${handles.latestPostsBlockFlexSecondColumn} w-third mv3 ph2 w-100-s`}
                >
                  {data.wpPosts.posts
                    .slice(1)
                    .map((post: PostData, index: number) => (
                      <div
                        key={index}
                        className={`${handles.latestPostsBlockFlexSecondColumnItem} mv1 w-100-l w-100-s`}
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
                    ))}
                </div>
              </Fragment>
            ) : (
              data.wpPosts.posts.map((post: PostData, index: number) => (
                <div
                  key={index}
                  className={`${handles.latestPostsBlockFlexItem} mv3 w-33-l ph2 w-100-s`}
                >
                  <WordpressTeaser
                    title={post.title.rendered}
                    date={post.date}
                    id={post.id}
                    slug={post.slug}
                    author={post.author?.name ?? ''}
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
              ))
            )}
          </div>
        </Fragment>
      ) : (
        !loading &&
        !error && (
          <div>
            <h3 className="t-heading-3">No posts found.</h3>
          </div>
        )
      )}
    </div>
  )
}

interface WPLatestPostsBlockProps {
  title: string
  twoColumns: boolean
  numberOfPosts: number
  useTextOverlays: boolean
  showCategories: boolean
  showDates: boolean
  showAuthors: boolean
  showExcerpts: boolean
}

WordpressLatestPostsBlock.defaultProps = {
  title: '',
  twoColumns: false,
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
    id: 'admin/editor.wordpressLatestPosts.title',
  },
  description: {
    defaultMessage: '',
    id: 'admin/editor.wordpressLatestPosts.description',
  },
  titleTitle: {
    defaultMessage: '',
    id: 'admin/editor.wordpressLatestPostsTitle.title',
  },
  titleDescription: {
    defaultMessage: '',
    id: 'admin/editor.wordpressLatestPostsTitle.description',
  },
  twoColumnsTitle: {
    defaultMessage: '',
    id: 'admin/editor.wordpressTwoColumns.title',
  },
  twoColumnsDescription: {
    defaultMessage: '',
    id: 'admin/editor.wordpressTwoColumns.description',
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

WordpressLatestPostsBlock.schema = {
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
    twoColumns: {
      title: messages.twoColumnsTitle.id,
      description: messages.twoColumnsDescription.id,
      type: 'boolean',
      isLayout: false,
      default: false,
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

export default WordpressLatestPostsBlock
