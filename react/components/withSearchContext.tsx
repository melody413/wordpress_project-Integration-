import React, { ComponentType } from 'react'
import { SearchPageContext } from 'vtex.search-page-context/SearchPageContext'

function withSearchContext(WrappedComponent: ComponentType<any>) {
  // eslint-disable-next-line react/display-name
  return function(props: any) {
    return (
      <SearchPageContext.Consumer>
        {({ searchQuery }: { searchQuery: any }) => (
          <WrappedComponent {...props} searchQuery={searchQuery} />
        )}
      </SearchPageContext.Consumer>
    )
  }
}

export default withSearchContext
