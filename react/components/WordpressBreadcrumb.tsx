import React, { FunctionComponent, Fragment } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Container } from 'vtex.store-components'
import { Link } from 'vtex.render-runtime'
import { useQuery } from 'react-apollo'

import PostSimpleBySlug from '../graphql/PostSimpleBySlug.graphql'
import Settings from '../graphql/Settings.graphql'
import CategorySimpleBySlug from '../graphql/CategorySimpleBySlug.graphql'

interface Props {
  params: any
}

interface CategoryProps {
  categorySlug?: string
  route: string
}

interface SinglePostProps {
  slug?: string
  route: string
}

const CSS_HANDLES = [
  'breadcrumbContainer',
  'breadcrumbHomeLink',
  'breadcrumbLink',
  'breadcrumbSeparator',
  'breadcrumbCurrentPage',
] as const

const WordpressCategoryBreadcrumb: FunctionComponent<CategoryProps> = props => {
  const handles = useCssHandles(CSS_HANDLES)
  const { data, loading, error } = useQuery(CategorySimpleBySlug, {
    variables: { categorySlug: props.categorySlug },
  })
  if (loading || error) return <Fragment></Fragment>
  if (data?.wpCategories?.categories?.length > 0)
    return (
      <Container className={`${handles.breadcrumbContainer} pt2 pb8`}>
        <Link
          to={'/' + props.route}
          className={`${handles.breadcrumbHomeLink}`}
        >
          Blog Home
        </Link>
        <span className={`${handles.breadcrumbSeparator}`}>&nbsp;/&nbsp;</span>
        <span className={`${handles.breadcrumbCurrentPage}`}>
          {data.wpCategories.categories[0].name}
        </span>
      </Container>
    )
  return null
}

const WordpressSinglePostBreadcrumb: FunctionComponent<SinglePostProps> = props => {
  const handles = useCssHandles(CSS_HANDLES)
  const { data, loading, error } = useQuery(PostSimpleBySlug, {
    variables: { slug: props.slug },
  })

  if (loading || error) return <Fragment></Fragment>
  if (data?.wpPosts?.posts?.length > 0)
    return (
      <Container className={`${handles.breadcrumbContainer} pt2 pb8`}>
        <Link
          to={'/' + props.route}
          className={`${handles.breadcrumbHomeLink}`}
        >
          Blog Home
        </Link>
        <span className={`${handles.breadcrumbSeparator}`}>&nbsp;/&nbsp;</span>
        <Link
          to={
            '/' +
            props.route +
            '/category/' +
            data.wpPosts.posts[0].categories[0].slug
          }
          className={`${handles.breadcrumbLink}`}
        >
          {data.wpPosts.posts[0].categories[0].name}
        </Link>
        <span className={`${handles.breadcrumbSeparator}`}>&nbsp;/&nbsp;</span>
        <span className={`${handles.breadcrumbCurrentPage}`}>
          {data.wpPosts.posts[0].title.rendered}
        </span>
      </Container>
    )
  return null
}

const WordpressBreadcrumb: FunctionComponent<Props> = props => {
  const handles = useCssHandles(CSS_HANDLES)
  const { loading: loadingS, data: dataS } = useQuery(Settings)
  let route = dataS?.appSettings?.blogRoute
  if (!route || route == '') route = 'blog'

  if (loadingS) return null

  // if we're on a category page with a slug
  if (props.params?.categoryslug) {
    return (
      <WordpressCategoryBreadcrumb
        categorySlug={props.params.categoryslug}
        route={route}
      />
    )
  }

  // if we're on an article search page
  if (props.params?.term) {
    return (
      <Container
        className={`${handles.breadcrumbContainer} pt2 pb8`}
        style={{ maxWidth: '90%' }}
      >
        <Link to={'/' + route} className={`${handles.breadcrumbHomeLink}`}>
          Blog Home
        </Link>
        <span className={`${handles.breadcrumbSeparator}`}>&nbsp;/&nbsp;</span>
        <span className={`${handles.breadcrumbCurrentPage}`}>
          Search results for &quot;{props.params.term}&quot;
        </span>
      </Container>
    )
  }

  // if we're viewing a single blog post with a slug
  if (props.params?.slug) {
    return (
      <WordpressSinglePostBreadcrumb slug={props.params.slug} route={route} />
    )
  }

  // else
  return (
    <Container className={`${handles.breadcrumbContainer} pt2 pb8`}>
      <Link to={'/' + route} className={`${handles.breadcrumbHomeLink}`}>
        Blog Home
      </Link>
    </Container>
  )
}

export default WordpressBreadcrumb
