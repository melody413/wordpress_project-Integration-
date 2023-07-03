import React from 'react'

interface WPRelatedProductsContextInterface {
  productIds: [string?]
}

export const WPRelatedProductsContext = React.createContext<
  WPRelatedProductsContextInterface
>({
  productIds: [],
})
