import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Configure Sanity client
export const client = createClient({
  projectId: 'fqp1d8a4',
  dataset: 'koneyblog',
  useCdn: true, // Enable CDN for better performance in production
  apiVersion: '2023-05-03', // Use the latest API version
  token: '', // Leave empty for public datasets
  withCredentials: false, // Keep false to avoid CORS preflight issues
});

// Set up the image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Types for blog posts
export interface Author {
  _id: string;
  name: string;
  image?: SanityImageSource;
}

export interface Category {
  _id: string;
  title: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: SanityImageSource;
  publishedAt: string;
  author?: Author;
  authorName?: string;
  authorImage?: SanityImageSource;
  categories?: string[];
  excerpt?: string;
  body?: any;
}

// Function to fetch all blog posts
export const getAllPosts = async (): Promise<Post[]> => {
  try {
    console.log('Fetching posts from Sanity with config:', {
      projectId: client.config().projectId,
      dataset: client.config().dataset,
      useCdn: client.config().useCdn,
    });
    
    const posts = await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        "authorName": author->name,
        "categories": categories[]->title,
        excerpt
      }`
    );
    
    console.log('Sanity query completed successfully, found', posts.length, 'posts');
    if (posts.length === 0) {
      console.warn('No posts found in Sanity. Check if you have published posts with _type "post"');
    }
    return posts || [];
  } catch (error) {
    console.error('Error fetching posts from Sanity:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    
    // Try a simpler query as fallback
    try {
      console.log('Attempting fallback query...');
      const simplePosts = await client.fetch(`*[_type == "post"][0...10]{_id, title}`);
      console.log('Fallback query result:', simplePosts);
      if (simplePosts && simplePosts.length > 0) {
        console.log('Fallback query successful, found', simplePosts.length, 'posts');
      }
    } catch (fallbackError) {
      console.error('Fallback query also failed:', fallbackError.message);
    }
    
    return [];
  }
};

// Function to fetch a single post by slug
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        "authorName": author->name,
        "authorImage": author->image,
        "categories": categories[]->title,
        body
      }`,
      { slug }
    );
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

// Function to fetch featured posts
export const getFeaturedPosts = async (limit: number = 3): Promise<Post[]> => {
  try {
    return await client.fetch(
      `*[_type == "post"] | order(publishedAt desc)[0...$limit] {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        "authorName": author->name,
        "categories": categories[]->title,
        excerpt
      }`,
      { limit: limit - 1 }
    );
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
};

// Function to fetch posts by category
export const getPostsByCategory = async (category: string): Promise<Post[]> => {
  try {
    return await client.fetch(
      `*[_type == "post" && $category in categories[]->title] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        "authorName": author->name,
        "categories": categories[]->title,
        excerpt
      }`,
      { category }
    );
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
};
