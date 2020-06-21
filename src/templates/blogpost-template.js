import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
//リッチテキスト内の要素をレンダリングできるようにする。
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
//リッチテキスト内の要素を扱えるようにする
// import { BLOCKS } from "@contentful/rich-text-types"

export default ({ data, pageContext }) => {
  return (
    <>
      <div>
        <div className="eyecatch">
          <figure>
            <Img
              fluid={data.contentfulBlogPost.eyecatch.fluid}
              alt={data.contentfulBlogPost.eyecatch.description}
            />
          </figure>
        </div>
        <article className="content">
          <div className="container">
            <h1 className="bar">{data.contentfulBlogPost.title}</h1>
            <aside className="info">
              <time dateTime={data.contentfulBlogPost.publishDate}>
                <i className="far fa-clock" />
                {data.contentfulBlogPost.publishDateJp}
              </time>
              <div className="cat">
                <i className="far fa-folder-open" />
                <ul>
                  {data.contentfulBlogPost.category.map(cat => (
                    <li key={cat.id} className={cat.categorySlug}>
                      {cat.category}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            <div className="postbody">
              {documentToReactComponents(data.contentfulBlogPost.content.json)}
            </div>
            <ul className="postlink">
              {pageContext.next && (
                <li className="prev">
                  <Link to={`/blog/post/${pageContext.next.slug}`} rel="prev">
                    <i className="fas fa-chevron-left" />
                    <span>{pageContext.next.title}</span>
                  </Link>
                </li>
              )}

              {pageContext.previous && (
                <li className="prev">
                  <Link
                    to={`/blog/post/${pageContext.previous.slug}`}
                    rel="prev"
                  >
                    <i className="fas fa-chevron-left" />
                    <span>{pageContext.previous.title}</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </article>
      </div>
    </>
  )
}

export const query = graphql`
  query($id: String) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      publishDateJp: publishDate(formatString: "YYYY年MM月DD日")
      publishDate
      category {
        category
        categorySlug
        id
      }
      eyecatch {
        fluid(maxWidth: 1600) {
          ...GatsbyContentfulFluid_withWebp
        }
        description
      }
      content {
        json
      }
    }
  }
`
