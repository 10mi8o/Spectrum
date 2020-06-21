import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

export default ({ data, pageContext }) => {
  return (
    <>
      <section className="content bloglist">
        <div className="container">
          {data.allContentfulBlogPost.edges.map(({ node }) => (
            <div key={node.id} className="posts">
              <article className="post">
                <Link to={`/blog/post/${node.slug}`}>
                  <figure>
                    <Img
                      fluid={node.eyecatch.fluid}
                      alt={node.eyecatch.description}
                    />
                  </figure>
                </Link>
                <h3>{node.title}</h3>
              </article>
            </div>
          ))}

          <ul className="pagenation">
            {!pageContext.isFirst && (
              <li className="prev">
                <Link
                  to={
                    pageContext.currentPage === 2
                      ? `/blog`
                      : `/blog/${pageContext.currentPage - 1}/`
                  }
                  rel="prev"
                >
                  <i className="fas fa-chevron-left" />
                  <span>前のページ</span>
                </Link>
              </li>
            )}

            {!pageContext.isLast && (
              <li className="next">
                <Link to={`/blog/${pageContext.currentPage + 1}`} rel="next">
                  <i className="fas fa-chevron-left" />
                  <span>次のページ</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </section>
    </>
  )
}

export const query = graphql`
  query {
    allContentfulBlogPost(
      sort: { order: DESC, fields: publishDate }
      skip: 0
      limit: 6
    ) {
      edges {
        node {
          title
          id
          slug
          eyecatch {
            fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid_withWebp
            }
            description
          }
        }
      }
    }
  }
`
