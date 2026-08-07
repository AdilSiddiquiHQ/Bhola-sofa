import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Loader } from 'lucide-react';
import './Blog.css';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogPosts';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate slight network delay for smooth transition, then load static posts
    setTimeout(() => {
      setPosts(blogPosts);
      setLoading(false);
    }, 400);
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog | Bhola Sofa Jamshedpur</title>
        <meta name="description" content="Read our latest guides on furniture, interior design, and sofa maintenance in Jamshedpur." />
      </Helmet>
      
      <div className="blog-page">
        <div className="blog-header">
          <h1>Furniture & Design Blog</h1>
          <p>Expert tips from Jamshedpur's oldest furniture manufacturer</p>
        </div>

        {loading ? (
          <div className="blog-loading">
            <Loader className="spin" size={48} />
          </div>
        ) : (
          <div className="blog-grid">
            {posts.length === 0 ? (
              <div className="no-posts">
                <p>No blog posts published yet. Check back soon!</p>
              </div>
            ) : (
              posts.map((post) => (
                <article key={post.id} className="blog-card">
                  {post.cover_image && (
                    <div className="blog-card-image">
                      <img src={post.cover_image} alt={post.title} />
                    </div>
                  )}
                  <div className="blog-card-content">
                    <div className="blog-meta">
                      <Calendar size={16} />
                      <span>{new Date(post.published_at).toLocaleDateString()}</span>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="read-more-btn">
                      Read Article <ChevronRight size={16} />
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
