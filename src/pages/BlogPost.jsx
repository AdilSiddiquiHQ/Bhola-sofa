import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, User, Loader } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogPosts';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const foundPost = blogPosts.find(p => p.slug === slug);
      setPost(foundPost || null);
      setLoading(false);
    }, 400);
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-loading page-loading">
        <Loader className="spin" size={48} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-not-found">
        <h2>Article not found</h2>
        <p>The blog post you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.meta_title || post.title} | Bhola Sofa</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        {post.keywords && <meta name="keywords" content={post.keywords} />}
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt} />
        {post.cover_image && <meta property="og:image" content={post.cover_image} />}
      </Helmet>
      
      <article className="blog-post-page">
        <div className="blog-post-container">
          <Link to="/blog" className="back-link">
            <ArrowLeft size={20} /> Back to Blog
          </Link>
          
          <header className="blog-post-header">
            <h1>{post.title}</h1>
            <div className="blog-post-meta">
              <span className="meta-item"><User size={16} /> {post.author}</span>
              <span className="meta-item"><Calendar size={16} /> {new Date(post.published_at).toLocaleDateString()}</span>
            </div>
          </header>

          {post.cover_image && (
            <div className="blog-post-cover">
              <img src={post.cover_image} alt={post.title} />
            </div>
          )}

          <div className="blog-post-content markdown-body">
            <ReactMarkdown>{post.content_markdown}</ReactMarkdown>
          </div>
          
          <div className="blog-post-footer">
            <div className="cta-box">
              <h3>Looking for Custom Furniture in Jamshedpur?</h3>
              <p>Visit our showroom in Jugsalai or message us on WhatsApp for a factory-direct quote.</p>
              <a href="https://wa.me/919204775927" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
