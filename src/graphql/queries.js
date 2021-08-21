/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      owner
      title
      content
      category
      createdAt
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
        createdAt
        public
        view
        like
        type
        comments {
          nextToken
        }
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
        category
        createdAt
        public
        view
        like
        type
        comments {
          nextToken
        }
        updatedAt
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
          category
          createdAt
          public
          view
          like
          type
          updatedAt
        }
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
        category
        createdAt
        public
        view
        like
        type
        comments {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
