/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { Spinner } from 'vtex.styleguide'
import { Container } from 'vtex.store-components'
import SanitizedHTML from 'react-sanitized-html'
import { useCssHandles } from 'vtex.css-handles'

import { WPRelatedProductsContext } from '../contexts/WordpressRelatedProducts'
import SinglePostBySlug from '../graphql/SinglePostBySlug.graphql'
import Settings from '../graphql/Settings.graphql'

const allowedTags = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'blockquote',
  'p',
  'a',
  'ul',
  'ol',
  'nl',
  'li',
  'b',
  'i',
  'strong',
  'em',
  'strike',
  'code',
  'hr',
  'br',
  'div',
  'table',
  'thead',
  'caption',
  'tbody',
  'tr',
  'th',
  'td',
  'pre',
  'img',
  'iframe',
  'figure',
]

const allowedAttrs = {
  a: ['href', 'name', 'target'],
  img: ['src', 'alt'],
  iframe: ['src', 'scrolling', 'frameborder', 'width', 'height', 'id'],
}

const CSS_HANDLES = [
  'postFlex',
  'postContainer',
  'postTitle',
  'postMeta',
  'postFeaturedImage',
  'postBody',
  'postChildrenContainer',
] as const

const WordpressPost: FunctionComponent = props => {
  const handles = useCssHandles(CSS_HANDLES)
  const {
    route: { params },
  } = useRuntime()
  const { loading: loadingS, data: dataS } = useQuery(Settings)
  const { loading, error, data } = useQuery(SinglePostBySlug, {
    variables: { slug: params.slug },
  })

  if (loading || loadingS) {
    return (
      <div className="mv5 flex justify-center" style={{ minHeight: 800 }}>
        <Spinner />
      </div>
    )
  } else if (error) {
    return (
      <div className="ph5" style={{ minHeight: 800 }}>
        Error! {error.message}
      </div>
    )
  } else if (data?.wpPosts?.posts) {
    const {
      title,
      date,
      author,
      categories,
      content,
      featured_media,
      excerpt,
      tags,
    } = data.wpPosts.posts[0]

    const dateObj = new Date(date)
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = dateObj.toLocaleDateString('en-US', dateOptions)

    const productIds = tags
      .filter((tag: WPTag) => tag.name && tag.name.includes('prod-'))
      .map((tag: WPTag) => tag.name.replace('prod-', ''))

    let route = dataS?.appSettings?.blogRoute
    if (!route || route == '') route = 'blog'

    return (
      <Container className={`${handles.postFlex} pt6 pb8 ph3`}>
        <Helmet>
          <title>
            {dataS?.appSettings?.titleTag && dataS.appSettings.titleTag != ''
              ? title.rendered + ' | ' + dataS.appSettings.titleTag
              : title.rendered}
          </title>
          <meta name="description" content={excerpt.rendered} />
        </Helmet>
        <div className={`${handles.postContainer} ph3`}>
          <h1 className={`${handles.postTitle} t-heading-1`}>
            <SanitizedHTML html={title.rendered} />
          </h1>
          <p className={`${handles.postMeta} t-small mw9 c-muted-1`}>
            <span>Posted {formattedDate} in </span>
            {categories.map((cat: any, index: number) => (
              <span key={index}>
                <a
                  className="link c-link hover-c-link active-c-link visited-c-link"
                  href={'/' + route + '/category/' + cat.slug}
                >
                  {cat.name}
                </a>
                {index + 1 === categories.length ? '' : ', '}
              </span>
            ))}
            {author != null && <span> by {author.name}</span>}
          </p>
          {featured_media != null && featured_media.media_type === 'image' && (
            <div className="mw9 pb8">
              <img
                className={`${handles.postFeaturedImage}`}
                src={featured_media.source_url}
                alt={featured_media.alt_text}
              />
              {featured_media.caption != null && (
                <SanitizedHTML
                  html={featured_media.caption.rendered}
                  allowedTags={[]}
                />
              )}
            </div>
          )}
          <div className={`${handles.postBody}`}>
            <SanitizedHTML
              html={content.rendered}
              allowedTags={allowedTags}
              allowedAttributes={allowedAttrs}
            />
          </div>
        </div>

        <WPRelatedProductsContext.Provider value={{ productIds: productIds }}>
          <div className={`${handles.postChildrenContainer}`}>
            {props.children}
          </div>
        </WPRelatedProductsContext.Provider>
      </Container>
    )
  } else {
    return (
      <div>
        <h2>No post found.</h2>
      </div>
    )
  }
}

export default WordpressPost
