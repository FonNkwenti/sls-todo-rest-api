/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onCreateOrder(filter: $filter) {
      id
      books {
        items {
          id
          title
          description
          price
          author
          createdAt
          updatedAt
          orderBooksId
        }
        nextToken
      }
      total
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onUpdateOrder(filter: $filter) {
      id
      books {
        items {
          id
          title
          description
          price
          author
          createdAt
          updatedAt
          orderBooksId
        }
        nextToken
      }
      total
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
    onDeleteOrder(filter: $filter) {
      id
      books {
        items {
          id
          title
          description
          price
          author
          createdAt
          updatedAt
          orderBooksId
        }
        nextToken
      }
      total
      createdAt
      updatedAt
    }
  }
`;
export const onCreateBook = /* GraphQL */ `
  subscription OnCreateBook {
    onCreateBook {
      id
      title
      description
      price
      author
      createdAt
      updatedAt
      orderBooksId
    }
  }
`;
export const onUpdateBook = /* GraphQL */ `
  subscription OnUpdateBook {
    onUpdateBook {
      id
      title
      description
      price
      author
      createdAt
      updatedAt
      orderBooksId
    }
  }
`;
export const onDeleteBook = /* GraphQL */ `
  subscription OnDeleteBook {
    onDeleteBook {
      id
      title
      description
      price
      author
      createdAt
      updatedAt
      orderBooksId
    }
  }
`;
