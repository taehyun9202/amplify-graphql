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
export const onCreateReply = /* GraphQL */ `
  subscription OnCreateReply {
    onCreateReply {
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
          category
          createdAt
          public
          view
          like
          type
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
export const onUpdateReply = /* GraphQL */ `
  subscription OnUpdateReply {
    onUpdateReply {
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
          category
          createdAt
          public
          view
          like
          type
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
export const onDeleteReply = /* GraphQL */ `
  subscription OnDeleteReply {
    onDeleteReply {
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
          category
          createdAt
          public
          view
          like
          type
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
      id
      owner
      list
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
      id
      owner
      list
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
      id
      owner
      list
      createdAt
      updatedAt
    }
  }
`;
