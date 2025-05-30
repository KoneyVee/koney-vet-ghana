import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import { getAllPosts, urlFor, Post } from '../lib/sanity';

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts from Sanity...');
        const data = await getAllPosts();
        console.log('Sanity posts retrieved:', data);
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Our Blog"
        description="Stay updated with the latest veterinary news, pet care tips, and stories from Koney's Veterinary Hospital."
        bgImage="https://images.unsplash.com/photo-1583336663277-620dc1996580?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: 'Blog', path: '/blog' }]}
      />
      <div className="container mx-auto px-4 py-12">

        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl">No blog posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                {post.mainImage && (
                  <img
                    src={urlFor(post.mainImage).width(600).height(400).url()}
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
                  <h2 className="text-xl font-semibold mb-2 text-primary">{post.title}</h2>
                  {post.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between">
                    {post.authorName && (
                      <span className="text-sm text-gray-500">By {post.authorName}</span>
                    )}
                    <Link
                      to={`/blog/${post.slug.current}`}
                      className="text-primary font-medium hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      
      </div>
      
      {/* CTA Section */}
      <section className="bg-vet-teal text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to give your pet the best care?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Book an appointment today and experience the Koney's Veterinary difference. Our team is here to provide exceptional care for your beloved pets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/appointment"
              className="bg-white text-vet-teal hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition-colors duration-300 inline-block text-center"
            >
              Book Appointment
            </Link>
            <Link 
              to="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-vet-teal font-semibold py-3 px-8 rounded-full transition-colors duration-300 inline-block text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Blog;
