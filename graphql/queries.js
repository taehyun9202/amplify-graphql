/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      owner
      title
      content
      public
      view
      like
      type
      comments {
        items {
          id
          owner
          content
          like
          createdAt
          updatedAt
        }
        nextToken
      }
      category
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        title
        content
        category
        public
        view
        like
        type
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listPostsWithFilterAndDate = /* GraphQL */ `
  query postByDate(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postByDate(
      type: "Post"
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        title
        content
        category
        public
        view
        like
        type
        comments {
          items {
            id
            content
            owner
            like
            reply {
              items {
                id
                content
                owner
                like
                updatedAt
              }
            }
            updatedAt
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      owner
      content
      like
      createdAt
      post {
        id
        owner
        title
        content
        public
        view
        like
        type
        comments {
          nextToken
        }
        category
        createdAt
        updatedAt
      }
      reply {
        items {
          id
          owner
          content
          like
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        content
        like
        createdAt
        post {
          id
          owner
          title
          content
          public
          view
          like
          type
          category
          createdAt
          updatedAt
        }
        reply {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReply = /* GraphQL */ `
  query GetReply($id: ID!) {
    getReply(id: $id) {
      id
      owner
      content
      like
      createdAt
      comment {
        id
        owner
        content
        like
        createdAt
        post {
          id
          owner
          title
          content
          public
          view
          like
          type
          category
          createdAt
          updatedAt
        }
        reply {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listReplies = /* GraphQL */ `
  query ListReplies(
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReplies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        content
        like
        createdAt
        comment {
          id
          owner
          content
          like
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      owner
      list
      createdAt
      updatedAt
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        list
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      image
      blogname
      description
      category
      following
      follower
      email
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        image
        blogname
        description
        category
        following
        follower
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const postByDate = /* GraphQL */ `
  query PostByDate(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        title
        content
        public
        view
        like
        type
        comments {
          nextToken
        }
        category
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
