/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      category
      view
      like
      public
      comments {
        items {
          id
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
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
        title
        content
        category
        view
        like
        public
        comments {
          items {
            id
            content
            createdAt
          }
        }
        createdAt
        updatedAt
        owner
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
        title
        content
        category
        view
        like
        public
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
        owner
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      content
      createdAt
      post {
        id
        title
        comments {
          nextToken
        }
        createdAt
        updatedAt
        owner
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
        content
        createdAt
        post {
          id
          title
          createdAt
          updatedAt
          owner
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
      comment
      createdAt
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
        comment
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query listCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        list
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const itemsByDate = /* GraphQL */ `
  query ItemsByDate(
    $queryName: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    itemsByDate(
      queryName: $queryName
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        createdAt
        queryName
        updatedAt
      }
      nextToken
    }
  }
`;
