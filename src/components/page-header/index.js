import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';
import Post from '../../models/post';
import PostSearch from '../post-search';
import './style.scss';

function PageHeader({ siteTitle }) {
  return (
    <StaticQuery
      query={graphql`
        query SearchIndexQuery {
          allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
            edges {
              node {
                frontmatter {
                  title
                  categories
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `}
      render={(data) => (
        <header className="page-header-wrapper">
          <div className="page-header">
            <div className="front-section">
              <Link className="link" to="/">
                {siteTitle}
              </Link>
            </div>
            <div className="trailing-section">
              <Link className="link" to="/about">
                about
              </Link>
              <Link className="link" to="/posts">
                posts
              </Link>
              <label className="label" htmlFor="검색">
                <PostSearch
                  posts={data.allMarkdownRemark.edges.map(({ node }) => new Post(node, true))}
                />
              </label>
            </div>
          </div>
        </header>
      )}
    />
  );
}

export default PageHeader;
