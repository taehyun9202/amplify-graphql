/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
