/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */
import { graphql, StaticQuery } from "gatsby"
import React from "react"
import Footer from "./Footer"
import "./layout.css"

const Layout: React.SFC<{}> = ({ children }) => (
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
        <Footer />
      </div>
    )}
  />
)

export default Layout
