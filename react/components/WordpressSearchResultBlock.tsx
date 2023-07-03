import React, { Fragment } from 'react'
import { useQuery } from 'react-apollo'
import { Spinner, Button } from 'vtex.styleguide'
import { defineMessages } from 'react-intl'
import { Link } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import WordpressTeaser from './WordpressTeaser'
import withSearchContext from './withSearchContext'
import SearchPosts from '../graphql/SearchPosts.graphql'
import Settings from '../graphql/Settings.graphql'

const CSS_HANDLES = [
  'searchResultBlockContainer',
  'searchResultBlockTitle',
  'searchResultBlockFlex',
  'searchResultBlockFlexItem',
  'searchResultBlockLink',
] as const

const WordpressSearchResultBlock: StorefrontFunctionComponent<WPSearchResultBlockProps> = ({
  searchQuery,
  useTextOverlays,
  showCategories,
  showDates,
  showAuthors,
  showExcerpts,
  numberOfPosts,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { loading: loadingS, data: dataS } = useQuery(Settings)
  const { loading, error, data } = useQuery(SearchPosts, {
    variables: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      wp_per_page: numberOfPosts,
      terms: searchQuery?.productSearch?.titleTag ?? null,
    },
  })

  let route = dataS?.appSettings?.blogRoute
  if (!route || route == '') route = 'blog'

  return (
    <div className={`${handles.searchResultBlockContainer} pv4 pb9`}>
      {(loading || loadingS) && <Spinner />}
      {error && <span>Error: {error.message}</span>}
      {searchQuery?.productSearch && data?.wpPosts ? (
        <Fragment>
          <h4 className={`${handles.searchResultBlockTitle} tc t-heading-2`}>
            {data.wpPosts.total_count} articles found for &quot;
            {searchQuery.productSearch.titleTag}&quot;:
          </h4>
          <div
            className={`${handles.searchResultBlockFlex} mv4 flex flex-row flex-wrap justify-between`}
          >
            {data.wpPosts.posts.map((post: PostData, index: number) => (
              <div
                key={index}
                className={`${handles.searchResultBlockFlexItem} mv3 w-33-l ph2 w-100-s`}
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
            ))}
          </div>
          <Link
            to={'/' + route + '/search/' + searchQuery.productSearch.titleTag}
            className={`${handles.searchResultBlockLink}`}
          >
            <Button variation="secondary" block>
              View all article results for &quot;
              {searchQuery.productSearch.titleTag}
              &quot; &gt;
            </Button>
          </Link>
        </Fragment>
      ) : (
        !loading && !error && <Fragment />
      )}
    </div>
  )
}

interface WPSearchResultBlockProps {
  numberOfPosts: number
  useTextOverlays: boolean
  showCategories: boolean
  showDates: boolean
  showAuthors: boolean
  showExcerpts: boolean
  searchQuery: any
}

WordpressSearchResultBlock.defaultProps = {
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
    id: 'admin/editor.wordpressSearchResultBlock.title',
  },
  description: {
    defaultMessage: '',
    id: 'admin/editor.wordpressSearchResultBlock.description',
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

WordpressSearchResultBlock.schema = {
  title: messages.title.id,
  description: messages.description.id,
  type: 'object',
  properties: {
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

export default withSearchContext(WordpressSearchResultBlock)
