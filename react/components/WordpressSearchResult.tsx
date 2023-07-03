/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, Fragment, useState } from 'react'
import { useQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { Spinner, Pagination } from 'vtex.styleguide'
import { Container } from 'vtex.store-components'
import Helmet from 'react-helmet'
import { useCssHandles } from 'vtex.css-handles'

import WordpressTeaser from './WordpressTeaser'
import SearchPosts from '../graphql/SearchPosts.graphql'
import Settings from '../graphql/Settings.graphql'

const CSS_HANDLES = [
  'listTitle',
  'searchListTitle',
  'listContainer',
  'searchListContainer',
  'listFlex',
  'searchListFlex',
  'listFlexItem',
  'searchListFlexItem',
] as const

const WordpressSearchResult: FunctionComponent = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const {
    route: { params },
  } = useRuntime()
  const handles = useCssHandles(CSS_HANDLES)
  const { loading: loadingS, data: dataS } = useQuery(Settings)
  const { loading, error, data, fetchMore } = useQuery(SearchPosts, {
    skip: !params,
    variables: {
      terms: params.term,
      wp_page: 1,
      wp_per_page: 10,
    },
  })

  if (!params || !params.term) return null
  return (
    <Fragment>
      <Helmet>
        <title>
          {dataS?.appSettings?.titleTag && dataS.appSettings.titleTag != ''
            ? 'Article search results for ' +
              decodeURIComponent(params.term) +
              ' | ' +
              dataS.appSettings.titleTag
            : 'Article search results for ' + decodeURIComponent(params.term)}
        </title>
      </Helmet>
      <h2
        className={`${handles.listTitle} ${handles.searchListTitle} t-heading-2 tc`}
      >
        Article search results for &quot;{decodeURIComponent(params.term)}
        &quot;
      </h2>

      <Container
        className={`${handles.listContainer} ${handles.searchListContainer} pt2 pb8`}
        style={{ maxWidth: '90%' }}
      >
        <div className="ph3">
          <Pagination
            rowsOptions={[10, 20, 30, 40]}
            currentItemFrom={(page - 1) * perPage + 1}
            currentItemTo={page * perPage}
            textOf="of"
            textShowRows="posts per page"
            totalItems={data?.wpPosts?.total_count ?? 0}
            onRowsChange={(event: any) => {
              setPage(1)
              setPerPage(event.target.value)
              fetchMore({
                variables: {
                  wp_page: 1,
                  wp_per_page: event.target.value,
                  terms: params.term,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev
                  return fetchMoreResult
                },
              })
            }}
            onPrevClick={() => {
              if (page > 1) {
                const prevPage = page - 1
                setPage(page - 1)
                fetchMore({
                  variables: {
                    wp_page: prevPage,
                    wp_per_page: perPage,
                    terms: params.term,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev
                    return fetchMoreResult
                  },
                })
              }
            }}
            onNextClick={() => {
              const nextPage = page + 1
              setPage(page + 1)
              fetchMore({
                variables: {
                  wp_page: nextPage,
                  wp_per_page: perPage,
                  terms: params.term,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev
                  return fetchMoreResult
                },
              })
            }}
          />
        </div>
        {(loading || loadingS) && (
          <div className="mv5 flex justify-center" style={{ minHeight: 800 }}>
            <Spinner />
          </div>
        )}
        {error && (
          <div className="ph5" style={{ minHeight: 800 }}>
            Error: {error.message}
          </div>
        )}
        {data?.wpPosts ? (
          <div
            className={`${handles.listFlex} ${handles.searchListFlex} mv4 flex flex-row flex-wrap`}
          >
            {data.wpPosts.posts.map((post: PostData, index: number) => (
              <div
                key={index}
                className={`${handles.listFlexItem} ${handles.searchListFlexItem} mv3 w-100-s w-50-l ph4`}
              >
                <WordpressTeaser
                  title={post.title.rendered}
                  author={post.author.name}
                  category={post.categories[0]?.name ?? ''}
                  categoryId={post.categories[0]?.id ?? undefined}
                  categorySlug={post.categories[0]?.slug ?? ''}
                  excerpt={post.excerpt.rendered}
                  date={post.date}
                  id={post.id}
                  slug={post.slug}
                  image={post.featured_media?.source_url ?? ''}
                  altText={post.featured_media?.alt_text ?? ''}
                  mediaType={post.featured_media?.media_type ?? ''}
                  showAuthor={false}
                  showCategory
                  showDate
                  showExcerpt
                  useTextOverlay={false}
                  settings={dataS.appSettings}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h2>No posts found.</h2>
          </div>
        )}
      </Container>
    </Fragment>
  )
}

export default WordpressSearchResult
