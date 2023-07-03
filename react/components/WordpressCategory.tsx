/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, Fragment, useState } from 'react'
import { useQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { Spinner, Pagination } from 'vtex.styleguide'
import { Container } from 'vtex.store-components'
import Helmet from 'react-helmet'
import { useCssHandles } from 'vtex.css-handles'

import WordpressTeaser from './WordpressTeaser'
import CategoryPostsBySlug from '../graphql/CategoryPostsBySlug.graphql'
import Settings from '../graphql/Settings.graphql'

const CSS_HANDLES = [
  'listTitle',
  'listContainer',
  'listFlex',
  'listFlexItem',
] as const

const initialPageVars = {
  wp_page: 1,
  wp_per_page: 10,
}

const WordpressCategory: FunctionComponent = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const {
    route: { params },
  } = useRuntime()
  const categoryVariable = { categorySlug: params.categoryslug }
  const handles = useCssHandles(CSS_HANDLES)
  const { loading: loadingS, data: dataS } = useQuery(Settings)
  const { loading, error, data, fetchMore } = useQuery(CategoryPostsBySlug, {
    variables: { ...categoryVariable, ...initialPageVars },
  })

  return (
    <Fragment>
      {dataS && data?.wpCategories?.categories?.length > 0 && (
        <Fragment>
          <Helmet>
            <title>
              {dataS?.appSettings?.titleTag && dataS.appSettings.titleTag != ''
                ? data.wpCategories.categories[0].name +
                  ' | ' +
                  dataS.appSettings.titleTag
                : data.wpCategories.categories[0].name}
            </title>
          </Helmet>
          <h2 className={`${handles.listTitle} t-heading-2 tc`}>
            {data.wpCategories.categories[0].name}
          </h2>
        </Fragment>
      )}
      <Container
        className={`${handles.listContainer} pt2 pb8`}
        style={{ maxWidth: '90%' }}
      >
        <div className="ph3">
          <Pagination
            rowsOptions={[10, 20, 30, 40]}
            currentItemFrom={(page - 1) * perPage + 1}
            currentItemTo={page * perPage}
            textOf="of"
            textShowRows="posts per page"
            totalItems={
              data?.wpCategories?.categories[0]?.wpPosts?.total_count ?? 0
            }
            onRowsChange={(event: any) => {
              setPage(1)
              setPerPage(event.target.value)
              fetchMore({
                variables: {
                  wp_page: 1,
                  wp_per_page: event.target.value,
                  ...categoryVariable,
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
                    ...categoryVariable,
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
                  ...categoryVariable,
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
        {data?.wpCategories?.categories?.length > 0 ? (
          <div className={`${handles.listFlex} mv4 flex flex-row flex-wrap`}>
            {data.wpCategories.categories[0].wpPosts.posts.map(
              (post: PostData, index: number) => (
                <div
                  key={index}
                  className={`${handles.listFlexItem} mv3 w-100-s w-50-l ph4`}
                >
                  <WordpressTeaser
                    title={post.title.rendered}
                    author={post.author.name}
                    excerpt={post.excerpt.rendered}
                    date={post.date}
                    id={post.id}
                    slug={post.slug}
                    image={post.featured_media?.source_url ?? ''}
                    altText={post.featured_media?.alt_text ?? ''}
                    mediaType={post.featured_media?.media_type ?? ''}
                    showAuthor={false}
                    showCategory={false}
                    showDate
                    showExcerpt
                    useTextOverlay={false}
                    settings={dataS.appSettings}
                  />
                </div>
              )
            )}
          </div>
        ) : (
          !loading &&
          !loadingS &&
          !error && (
            <div>
              <h2>No posts found.</h2>
            </div>
          )
        )}
      </Container>
    </Fragment>
  )
}

export default WordpressCategory
