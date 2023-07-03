import gql from 'graphql-tag';
import { User } from './user';

// Post Type for PostList
export type PartialPost = {
  id: string;
  url_slug: string;
  title: string;
  thumbnail: string;
  short_description: string;
  released_at: string;
  updated_at: string;
  likes: number;
  user: User;
};

export interface SinglePost {
  id: string;
  url_slug: string;
  title: string;
  thumbnail: string | null;
  short_description: string;
  released_at: string;
  updated_at: string;
  likes: number;
  user: {
    id: string;
    username: string;
    profile: {
      id: string;
      display_name: string;
      thumbnail: string;
      short_bio: string;
    };
  };
  
  liked: boolean;

  body: string;
  is_markdown: boolean;
}

export type GetTrendingPostsResponse = {
  trendingPosts: PartialPost[];
};

export type GetRecommendedPostResponse = {
  post: {
    recommended_posts: PartialPost[];
  };
};

export type PostViewResponse = {
  postView: boolean;
};

export type SearchPostsResponse = {
  searchPosts: {
    posts: PartialPost[];
    count: number;
  };
};

export const GET_RECENT_POSTS = gql`
  query RecentPosts($cursor: ID, $limit: Int) {
    recentPosts(cursor: $cursor, limit: $limit) {
      id
      title
      short_description
      thumbnail
      user {
        id
        username
        profile {
          id
          thumbnail
        }
      }
      url_slug
      released_at
      updated_at
      comments_count
      tags
      is_private
      likes
    }
  }
`;

export const GET_TRENDING_POSTS = gql`
  query TrendingPosts($limit: Int, $offset: Int, $timeframe: String) {
    trendingPosts(limit: $limit, offset: $offset, timeframe: $timeframe) {
      id
      title
      short_description
      thumbnail
      likes
      user {
        id
        username
        profile {
          id
          thumbnail
        }
      }
      url_slug
      released_at
      updated_at
      comments_count
      tags
      is_private
    }
  }
`;

export const READ_POST = gql`
  query ReadPost($username: String, $url_slug: String) {
    post(username: $username, url_slug: $url_slug) {
      id
      title
      released_at
      updated_at
      tags
      body
      short_description
      is_markdown
      is_private
      is_temp
      thumbnail
      comments_count
      url_slug
      likes
      liked
      user {
        id
        username
        profile {
          id
          display_name
          thumbnail
          short_bio
          profile_links
        }
      }
      comments {
        id
        user {
          id
          username
          profile {
            id
            thumbnail
          }
        }
        text
        replies_count
        level
        created_at
        level
        deleted
      }
      series {
        id
        name
        url_slug
        series_posts {
          id
          post {
            id
            title
            url_slug
            user {
              id
              username
            }
          }
        }
      }
      linked_posts {
        previous {
          id
          title
          url_slug
          user {
            id
            username
          }
        }
        next {
          id
          title
          url_slug
          user {
            id
            username
          }
        }
      }
    }
  }
`;

export const GET_RECOMMENDED_POST = gql`
  query GetRecommendedPosts($id: ID) {
    post(id: $id) {
      recommended_posts {
        id
        title
        short_description
        thumbnail
        likes
        user {
          id
          username
          profile {
            id
            thumbnail
          }
        }
        url_slug
        released_at
        updated_at
        comments_count
        tags
        is_private
      }
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($id: ID!) {
    likePost(id: $id) {
      id
      likes
      liked
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation UnlikePost($id: ID!) {
    unlikePost(id: $id) {
      id
      likes
      liked
    }
  }
`;

export const SEARCH_POSTS = gql`
  query SearchPosts($keyword: String!, $offset: Int, $username: String) {
    searchPosts(keyword: $keyword, offset: $offset, username: $username) {
      count
      posts {
        id
        title
        short_description
        thumbnail
        user {
          id
          username
          profile {
            id
            thumbnail
          }
        }
        url_slug
        released_at
        tags
        is_private
        comments_count
      }
    }
  }
`;

export const POST_VIEW = gql`
  mutation PostView($id: ID!) {
    postView(id: $id)
  }
`;

