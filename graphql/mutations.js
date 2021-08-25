/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      owner
      title
      content
      public
      view
      like
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      owner
      title
      content
      public
      view
      like
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
      type
      category
      createdAt
      updatedAt
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      owner
      title
      content
      public
      view
      like
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
      type
      category
      createdAt
      updatedAt
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
        comments {
          nextToken
        }
        type
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
        comments {
          nextToken
        }
        type
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
        comments {
          nextToken
        }
        type
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
export const createReply = /* GraphQL */ `
  mutation CreateReply(
    $input: CreateReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    createReply(input: $input, condition: $condition) {
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
export const updateReply = /* GraphQL */ `
  mutation UpdateReply(
    $input: UpdateReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    updateReply(input: $input, condition: $condition) {
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
export const deleteReply = /* GraphQL */ `
  mutation DeleteReply(
    $input: DeleteReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    deleteReply(input: $input, condition: $condition) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      owner
      list
      createdAt
      updatedAt
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      owner
      list
      createdAt
      updatedAt
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      owner
      list
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
