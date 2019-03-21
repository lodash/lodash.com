/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */
import { graphql, StaticQuery } from "gatsby"
import React from "react"
import "./layout.css"

const Layout = ({ children }): JSX.Element => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={() => (
      <div>
        <main>{children}</main>
      </div>
    )}
  />
)

export default Layout
