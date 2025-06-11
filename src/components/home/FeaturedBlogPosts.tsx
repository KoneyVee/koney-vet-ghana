import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { urlFor, Post, getFeaturedPosts } from '../../lib/sanity';

const FeaturedBlogPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        console.log('FeaturedBlogPosts: Fetching featured posts from Sanity...');
        const data = await getFeaturedPosts(3); // Get 3 featured posts
        console.log('FeaturedBlogPosts: Sanity featured posts retrieved:', data);
        setPosts(data || []);
        setLoading(false);
      } catch (error) {
        console.error('FeaturedBlogPosts: Error fetching featured posts:', error);
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-2">Our Latest Articles</h2>
            <p className="text-gray-600">Loading latest articles...</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return null; // Don't show the section if there are no posts
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-primary mb-2"
          >
            Our Latest Articles
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600"
          >
            Stay updated with the latest veterinary tips and news
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {post.mainImage && (
                <img
                  src={urlFor(post.mainImage).width(600).height(300).url()}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-500">{formatDate(post.publishedAt)}</span>
                  {post.categories && post.categories.length > 0 && (
                    <span className="ml-auto bg-primary-light text-primary text-xs px-2 py-1 rounded-full">
                      {post.categories[0]}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary line-clamp-2">{post.title}</h3>
                {post.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                )}
                <Link
                  to={`/blog/${post.slug.current}`}
                  className="text-primary font-medium hover:underline inline-flex items-center"
                >
                  Read More <span className="ml-1">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to="/blog"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-full transition-colors duration-300"
            >
              View All Articles
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogPosts;
