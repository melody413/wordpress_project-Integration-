# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2020-02-10

### Fixed

- Fixed the way `WordpressProductSearchResult` accesses the current search query
- Added missing `slug` field in some GraphQL queries

## [1.0.1] - 2020-01-17

### Fixed

- WordpressCategoryBlock was still using old URL structure for link to "All (category) Posts"
- Additional null checking for ProductQuery in WordpressRelatedPosts

## [1.0.0] - 2020-01-16

### Changed

- Blog post and category URLs are now based on slugs rather than numeric IDs

## [0.1.2] - 2020-01-13

### Fixed

- WordpressRelatedPostsBlock now checks to make sure productQuery is defined before rendering

## [0.1.1] - 2020-01-13

### Fixed

- Fixed bug preventing some blog breadcrumbs from displaying
- Fixed double Link in blog teasers with text overlays

## [0.1.0] - 2020-01-13

### Changed

- All components are now FunctionComponents
- Moved components out of root folder
- Updated components to use React-Apollo `useQuery` hook
- Implemented CSS Handles

## [0.0.12] - 2019-11-08

### Fixed

- Changed the way `WordpressProductSearchResult` accesses the current search query per the new requirements of `withSearchContext`

## [0.0.11] - 2019-10-24

### Fixed

- Fixed render issue with `withSettings` HOCs (container div was not being re-rendered after loading completed)

## [0.0.10] - 2019-10-18

### Changed

- Removed min-height styling from `withSettings` HOCs

## [0.0.9] - 2019-10-16

### Fixed

- Article search now uses the param `term` instead of `terms` (`terms` is reserved by `render-runtime`)
- Applied standard VTEX prettier to react files
- Updated documentation and deleted README.md in root folder

## [0.0.8] - 2019-09-23

### Added

- `search-blog-articles-list` to allow paginated article search results on product search page
- `wordpress-breadcrumb` now shows search query on article search result pages

### Changed

- Use `defineMessages` from `react-intl`

### Fixed

- Allow `h1` and `h2` tags in Wordpress blog post content

## [0.0.7] - 2019-09-18

### Changed

- Start using `search-graphql` for product queries.

## [0.0.6] - 2019-09-16

### Added

- `search-blog-articles-preview` block to show article search results on product search result page

### Fixed

- Disabled SSR for appSettings calls except where necessary

## [0.0.5] - 2019-09-09

### Fixed

- App settings query for blogRoute fixed
- Disabled SSR for paginated lists to avoid SSR timeouts
- General performance improvements

## [0.0.4] - 2019-08-06

### Changed

- Docs migration
