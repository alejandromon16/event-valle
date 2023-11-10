import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AssignRolesToUserInput = {
  roles: Array<RoleType>;
  userId: Scalars['String']['input'];
};

export type CreateRequestEventInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  requestedById: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateRoleInput = {
  description: Scalars['String']['input'];
  name: RoleType;
};

export type CreateUserInput = {
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  email: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone_number?: InputMaybe<Scalars['String']['input']>;
  user_name: Scalars['String']['input'];
};

export type FindRoleByNameInput = {
  name: RoleType;
};

/** Login user input */
export type LoginInput = {
  /** Email of the user */
  email: Scalars['String']['input'];
  /** Password of the user */
  password: Scalars['String']['input'];
};

export type LogoutEntity = {
  __typename?: 'LogoutEntity';
  status: Scalars['String']['output'];
};

export type MeEntity = {
  __typename?: 'MeEntity';
  roles: Array<RoleEntity>;
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assignRolesToUser: UserEntity;
  createRequestEvent: RequestEventEntity;
  createRole: RoleEntity;
  createUser: UserEntity;
  login: UserEntity;
  removeUser: UserEntity;
  requestPasswordReset: UserEntity;
  resetPassword: UserEntity;
  updateUser: UserEntity;
  validatePasswordResetToken: ValidatePasswordResetTokenEntity;
};


export type MutationAssignRolesToUserArgs = {
  assignRolesToUser: AssignRolesToUserInput;
};


export type MutationCreateRequestEventArgs = {
  createRequestEventInput: CreateRequestEventInput;
};


export type MutationCreateRoleArgs = {
  createRoleInput: CreateRoleInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationRequestPasswordResetArgs = {
  requestPasswordResetInput: RequestPasswordResetInput;
};


export type MutationResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationValidatePasswordResetTokenArgs = {
  validatePasswordResetTokenInput: ValidatePasswordResetTokenInput;
};

export type Query = {
  __typename?: 'Query';
  findRoleByName: RoleEntity;
  getListOfRequestsEvents: Array<RequestEventEntity>;
  listUsers: Array<UserEntity>;
  logout: LogoutEntity;
  me: MeEntity;
  retrieveUser: UserEntity;
  rolesList: Array<RoleEntity>;
};


export type QueryFindRoleByNameArgs = {
  findRoleByName: FindRoleByNameInput;
};


export type QueryRetrieveUserArgs = {
  id: Scalars['String']['input'];
};

export type RequestEventEntity = {
  __typename?: 'RequestEventEntity';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  requestedBy?: Maybe<UserEntity>;
  status: RequestEventStatus;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

/** Possible status for request event */
export enum RequestEventStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

/** Reset password input */
export type RequestPasswordResetInput = {
  /** Email of the user */
  email: Scalars['String']['input'];
};

/** Reset password input */
export type ResetPasswordInput = {
  /** New password to update */
  newPassword: Scalars['String']['input'];
  /** Password reset token to validate */
  token: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type RoleEntity = {
  __typename?: 'RoleEntity';
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: RoleType;
  users: Array<UserEntity>;
};

/** Possible roles for a user */
export enum RoleType {
  Admin = 'ADMIN',
  ContentApprover = 'CONTENT_APPROVER',
  ContentPublisher = 'CONTENT_PUBLISHER',
  ContentVisulizer = 'CONTENT_VISULIZER',
  RequestApprover = 'REQUEST_APPROVER',
  SuperAdmin = 'SUPER_ADMIN',
  User = 'USER'
}

export type UpdateUserInput = {
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  last_name?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  user_name?: InputMaybe<Scalars['String']['input']>;
};

export type UserEntity = {
  __typename?: 'UserEntity';
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  roles: Array<RoleEntity>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user_name: Scalars['String']['output'];
};

export type ValidatePasswordResetTokenEntity = {
  __typename?: 'ValidatePasswordResetTokenEntity';
  /** Expiration date of password reset token */
  expiration_date: Scalars['DateTime']['output'];
};

/** Validate password reset token input */
export type ValidatePasswordResetTokenInput = {
  /** Password reset token to validate */
  token: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', listUsers: Array<{ __typename?: 'UserEntity', id: string, email: string, createdAt?: string | null, name: string, password?: string | null, updatedAt?: string | null, roles: Array<{ __typename?: 'RoleEntity', name: RoleType, id: string }> }> };

export type GetListOfRequestsEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfRequestsEventsQuery = { __typename?: 'Query', getListOfRequestsEvents: Array<{ __typename?: 'RequestEventEntity', id: string, status: RequestEventStatus, title: string, requestedBy?: { __typename?: 'UserEntity', id: string, name: string, user_name: string } | null }> };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserEntity', id: string, name: string, user_name: string, email: string, last_name: string } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'MeEntity', userId: string, roles: Array<{ __typename?: 'RoleEntity', name: RoleType }> } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserEntity', id: string, email: string, last_name: string, name: string, phone_number?: string | null, user_name: string } };

export type CreateRequestEventMutationVariables = Exact<{
  input: CreateRequestEventInput;
}>;


export type CreateRequestEventMutation = { __typename?: 'Mutation', createRequestEvent: { __typename?: 'RequestEventEntity', id: string, createdAt?: string | null, status: RequestEventStatus, title: string } };

export type RolesListQueryVariables = Exact<{ [key: string]: never; }>;


export type RolesListQuery = { __typename?: 'Query', rolesList: Array<{ __typename?: 'RoleEntity', id: string, name: RoleType, description: string, users: Array<{ __typename?: 'UserEntity', id: string, name: string }> }> };


export const GetUsersDocument = gql`
    query GetUsers {
  listUsers {
    id
    email
    createdAt
    name
    roles {
      name
      id
    }
    password
    updatedAt
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetListOfRequestsEventsDocument = gql`
    query GetListOfRequestsEvents {
  getListOfRequestsEvents {
    id
    status
    title
    requestedBy {
      id
      name
      user_name
    }
  }
}
    `;

/**
 * __useGetListOfRequestsEventsQuery__
 *
 * To run a query within a React component, call `useGetListOfRequestsEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListOfRequestsEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListOfRequestsEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListOfRequestsEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetListOfRequestsEventsQuery, GetListOfRequestsEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListOfRequestsEventsQuery, GetListOfRequestsEventsQueryVariables>(GetListOfRequestsEventsDocument, options);
      }
export function useGetListOfRequestsEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListOfRequestsEventsQuery, GetListOfRequestsEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListOfRequestsEventsQuery, GetListOfRequestsEventsQueryVariables>(GetListOfRequestsEventsDocument, options);
        }
export type GetListOfRequestsEventsQueryHookResult = ReturnType<typeof useGetListOfRequestsEventsQuery>;
export type GetListOfRequestsEventsLazyQueryHookResult = ReturnType<typeof useGetListOfRequestsEventsLazyQuery>;
export type GetListOfRequestsEventsQueryResult = Apollo.QueryResult<GetListOfRequestsEventsQuery, GetListOfRequestsEventsQueryVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(loginInput: $input) {
    id
    name
    user_name
    email
    last_name
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetMeDocument = gql`
    query getMe {
  me {
    userId
    roles {
      name
    }
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(createUserInput: $input) {
    id
    email
    last_name
    name
    phone_number
    user_name
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const CreateRequestEventDocument = gql`
    mutation CreateRequestEvent($input: CreateRequestEventInput!) {
  createRequestEvent(createRequestEventInput: $input) {
    id
    createdAt
    status
    title
  }
}
    `;
export type CreateRequestEventMutationFn = Apollo.MutationFunction<CreateRequestEventMutation, CreateRequestEventMutationVariables>;

/**
 * __useCreateRequestEventMutation__
 *
 * To run a mutation, you first call `useCreateRequestEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRequestEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRequestEventMutation, { data, loading, error }] = useCreateRequestEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRequestEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateRequestEventMutation, CreateRequestEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRequestEventMutation, CreateRequestEventMutationVariables>(CreateRequestEventDocument, options);
      }
export type CreateRequestEventMutationHookResult = ReturnType<typeof useCreateRequestEventMutation>;
export type CreateRequestEventMutationResult = Apollo.MutationResult<CreateRequestEventMutation>;
export type CreateRequestEventMutationOptions = Apollo.BaseMutationOptions<CreateRequestEventMutation, CreateRequestEventMutationVariables>;
export const RolesListDocument = gql`
    query RolesList {
  rolesList {
    id
    name
    description
    users {
      id
      name
    }
  }
}
    `;

/**
 * __useRolesListQuery__
 *
 * To run a query within a React component, call `useRolesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesListQuery({
 *   variables: {
 *   },
 * });
 */
export function useRolesListQuery(baseOptions?: Apollo.QueryHookOptions<RolesListQuery, RolesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RolesListQuery, RolesListQueryVariables>(RolesListDocument, options);
      }
export function useRolesListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RolesListQuery, RolesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RolesListQuery, RolesListQueryVariables>(RolesListDocument, options);
        }
export type RolesListQueryHookResult = ReturnType<typeof useRolesListQuery>;
export type RolesListLazyQueryHookResult = ReturnType<typeof useRolesListLazyQuery>;
export type RolesListQueryResult = Apollo.QueryResult<RolesListQuery, RolesListQueryVariables>;