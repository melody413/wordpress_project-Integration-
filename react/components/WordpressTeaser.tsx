import React, { FunctionComponent, Fragment } from 'react'
import { Card } from 'vtex.styleguide'
import { Link } from 'vtex.render-runtime'
import SanitizedHTML from 'react-sanitized-html'
import { useCssHandles } from 'vtex.css-handles'

interface TeaserProps {
  title: string
  author: string
  excerpt: string
  category?: string
  categoryId?: number
  categorySlug?: string
  date: string
  id: number
  slug: string
  image: string
  altText: string
  mediaType: string
  showCategory: boolean
  showAuthor: boolean
  showDate: boolean
  showExcerpt: boolean
  useTextOverlay: boolean
  settings: AppSettings
}

interface AppSettings {
  titleTag: string
  blogRoute: string
}

const CSS_HANDLES = [
  'teaserContainer',
  'teaserImage',
  'teaserTextOverlay',
  'teaserTextOverlayTitle',
  'teaserTextOverlayMeta',
  'teaserGradientOverlay',
  'teaserTitle',
] as const

const WordpressTeaser: FunctionComponent<TeaserProps> = ({
  settings: { blogRoute },
  title,
  author,
  excerpt,
  category,
  categorySlug,
  date,
  slug,
  mediaType,
  image,
  altText,
  showCategory,
  showAuthor,
  showDate,
  showExcerpt,
  useTextOverlay,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const dateObj = new Date(date)
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = dateObj.toLocaleDateString('en-US', dateOptions)
  const route = blogRoute && blogRoute !== '' ? blogRoute : 'blog'
  return (
    <Card noPadding className={`${handles.teaserContainer}`}>
      {(showCategory || showDate || showAuthor) &&
        (!useTextOverlay || mediaType != 'image') && (
          <h5 className="mv1 ph6 pt6 pb4">
            {showCategory &&
              category != undefined &&
              categorySlug != undefined && (
                <Fragment>
                  <Link to={'/' + route + '/category/' + categorySlug}>
                    {category}
                  </Link>
                </Fragment>
              )}
            {((showCategory && showDate) || (showCategory && showAuthor)) && (
              <Fragment> - </Fragment>
            )}
            {showDate && <Fragment>{formattedDate}</Fragment>}
            {showDate && showAuthor && <Fragment> - </Fragment>}
            {showAuthor && <Fragment>{author}</Fragment>}
          </h5>
        )}
      {mediaType === 'image' && (
        <Fragment>
          {useTextOverlay ? (
            <div className="tc-m db relative">
              <img
                className={`${handles.teaserImage} w-100`}
                src={image}
                alt={altText}
              ></img>
              <div
                className={`${handles.teaserGradientOverlay} absolute absolute--fill`}
                style={{
                  background: `linear-gradient(to bottom,rgba(0,0,0,0) 0,rgba(0,0,0,0) 50%,rgba(0,0,0,.6) 100%)`,
                }}
              >
                <div
                  className={`${handles.teaserTextOverlay} absolute tl`}
                  style={{
                    bottom: `15%`,
                    left: `5%`,
                  }}
                >
                  <div
                    className={`${handles.teaserTextOverlayTitle} t-heading-5 white fw5 mb3`}
                  >
                    <Link
                      to={'/' + route + '/post/' + slug}
                      className="white no-underline"
                    >
                      {title}
                    </Link>
                  </div>
                  {(showCategory || showDate || showAuthor) && (
                    <div
                      className={`${handles.teaserTextOverlayMeta} white t-mini`}
                    >
                      {showCategory &&
                        category != undefined &&
                        categorySlug != undefined && (
                          <Fragment>
                            <Link
                              to={'/' + route + '/category/' + categorySlug}
                              className={'white'}
                            >
                              {category}
                            </Link>
                          </Fragment>
                        )}
                      {((showCategory && showDate) ||
                        (showCategory && showAuthor)) && (
                        <Fragment> - </Fragment>
                      )}
                      {showDate && <Fragment>{formattedDate}</Fragment>}
                      {showDate && showAuthor && <Fragment> - </Fragment>}
                      {showAuthor && <Fragment>{author}</Fragment>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Fragment>
              <Link to={'/' + route + '/post/' + slug} className="tc-m db">
                <img
                  className={`${handles.teaserImage}`}
                  src={image}
                  alt={altText}
                ></img>
              </Link>
              <h3
                className={`${handles.teaserTitle} t-heading-3 mv0 pt4 pb6 ph6`}
              >
                <Link to={'/' + route + '/post/' + slug}>
                  <SanitizedHTML html={title} />
                </Link>
              </h3>
            </Fragment>
          )}
        </Fragment>
      )}

      {mediaType != 'image' && (
        <h3 className={`${handles.teaserTitle} t-heading-3 mv0 pt4 pb6 ph6`}>
          <Link to={'/' + route + '/post/' + slug}>
            <SanitizedHTML html={title} />
          </Link>
        </h3>
      )}

      {showExcerpt && <SanitizedHTML className="ph6 pb6" html={excerpt} />}
    </Card>
  )
}

export default WordpressTeaser
