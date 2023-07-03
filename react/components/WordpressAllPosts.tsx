/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-apollo'
import { Spinner, Pagination } from 'vtex.styleguide'
import { Container } from 'vtex.store-components'
import { useCssHandles } from 'vtex.css-handles'

import WordpressTeaser from './WordpressTeaser'
import Settings from '../graphql/Settings.graphql'
import AllPosts from '../graphql/AllPosts.graphql'

const CSS_HANDLES = [
  'listTitle',
  'listContainer',
  'listFlex',
  'listFlexItem',
] as const

const WordpressAllPosts: FunctionComponent = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const handles = useCssHandles(CSS_HANDLES)
  const { loading: loadingS, data: dataS } = useQuery(Settings)
  const { loading, error, data, fetchMore } = useQuery(AllPosts, {
    variables: {
      wp_page: 1,
      wp_per_page: 10,
    },
  })

  return (
    <Container
      className={`${handles.listContainer} pt6 pb8`}
      style={{ maxWidth: '90%' }}
    >
      {dataS?.appSettings?.titleTag && dataS.appSettings.titleTag != '' && (
        <Helmet>
          <title>{dataS.appSettings.titleTag}</title>
        </Helmet>
      )}
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
        <div className={`${handles.listFlex} mv4 flex flex-row flex-wrap`}>
          {data.wpPosts.posts.map((post: PostData, index: number) => (
            <div
              key={index}
              className={`${handles.listFlexItem} mv3 w-100-s w-50-l ph4`}
            >
              <WordpressTeaser
                title={post.title.rendered}
                author={post.author != null ? post.author.name : ''}
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
        !loading &&
        !error && (
          <div>
            <h2>No posts found.</h2>
          </div>
        )
      )}
    </Container>
  )
}

export default WordpressAllPosts
