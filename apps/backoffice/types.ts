import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
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

export type CreateEventInput = {
  address: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['String']['input']>;
  images: Array<Scalars['String']['input']>;
  locationName: Scalars['String']['input'];
  principalImage: Scalars['String']['input'];
  requestEventId: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
  subtitle: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
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

export type EventEntity = {
  __typename?: 'EventEntity';
  address: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  images: Array<Scalars['String']['output']>;
  latitud?: Maybe<Scalars['Float']['output']>;
  locationDetail?: Maybe<Scalars['String']['output']>;
  locationName: Scalars['String']['output'];
  longitud?: Maybe<Scalars['Float']['output']>;
  principalImage: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  status: EventStatus;
  subtitle: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

/** Possible status for events */
export enum EventStatus {
  Draft = 'DRAFT',
  Publish = 'PUBLISH'
}

export type FindRoleByNameInput = {
  name: RoleType;
};

export type GetRequestsEventsByUserIdInput = {
  userId: Scalars['String']['input'];
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
  createEvent: EventEntity;
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


export type MutationCreateEventArgs = {
  createEventInput: CreateEventInput;
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
  getListOfEvents: Array<EventEntity>;
  getListOfEventsForThisMonth: Array<EventEntity>;
  getListOfEventsForThisWeek: Array<EventEntity>;
  getListOfRequestsEvents: Array<RequestEventEntity>;
  getListOfRequestsEventsByUserId: Array<RequestEventEntity>;
  listUsers: Array<UserEntity>;
  logout: LogoutEntity;
  me: MeEntity;
  retrieveUser: UserEntity;
  rolesList: Array<RoleEntity>;
};


export type QueryFindRoleByNameArgs = {
  findRoleByName: FindRoleByNameInput;
};


export type QueryGetListOfRequestsEventsByUserIdArgs = {
  getRequestsEventsByUserId: GetRequestsEventsByUserIdInput;
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


export type GetUsersQuery = { __typename?: 'Query', listUsers: Array<{ __typename?: 'UserEntity', id: string, email: string, createdAt?: string | null, name: string, last_name: string, phone_number?: string | null, password?: string | null, updatedAt?: string | null, roles: Array<{ __typename?: 'RoleEntity', name: RoleType, id: string }> }> };

export type GetListOfRequestsEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfRequestsEventsQuery = { __typename?: 'Query', getListOfRequestsEvents: Array<{ __typename?: 'RequestEventEntity', id: string, status: RequestEventStatus, title: string, requestedBy?: { __typename?: 'UserEntity', id: string, name: string, user_name: string } | null }> };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: { __typename?: 'LogoutEntity', status: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserEntity', id: string, name: string, user_name: string, email: string, last_name: string, roles: Array<{ __typename?: 'RoleEntity', name: RoleType }> } };

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

export type GetListOfRequestsEventsByUserIdQueryVariables = Exact<{
  input: GetRequestsEventsByUserIdInput;
}>;


export type GetListOfRequestsEventsByUserIdQuery = { __typename?: 'Query', getListOfRequestsEventsByUserId: Array<{ __typename?: 'RequestEventEntity', id: string, status: RequestEventStatus, title: string, createdAt?: string | null, requestedBy?: { __typename?: 'UserEntity', id: string, name: string, user_name: string } | null }> };



export const GetUsersDocument = `
    query GetUsers {
  listUsers {
    id
    email
    createdAt
    name
    last_name
    phone_number
    roles {
      name
      id
    }
    password
    updatedAt
  }
}
    `;

export const useGetUsersQuery = <
      TData = GetUsersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetUsersQueryVariables,
      options?: UseQueryOptions<GetUsersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetUsersQuery, TError, TData>(
      variables === undefined ? ['GetUsers'] : ['GetUsers', variables],
      fetcher<GetUsersQuery, GetUsersQueryVariables>(client, GetUsersDocument, variables, headers),
      options
    )};

export const GetListOfRequestsEventsDocument = `
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

export const useGetListOfRequestsEventsQuery = <
      TData = GetListOfRequestsEventsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetListOfRequestsEventsQueryVariables,
      options?: UseQueryOptions<GetListOfRequestsEventsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetListOfRequestsEventsQuery, TError, TData>(
      variables === undefined ? ['GetListOfRequestsEvents'] : ['GetListOfRequestsEvents', variables],
      fetcher<GetListOfRequestsEventsQuery, GetListOfRequestsEventsQueryVariables>(client, GetListOfRequestsEventsDocument, variables, headers),
      options
    )};

export const LogoutDocument = `
    query Logout {
  logout {
    status
  }
}
    `;

export const useLogoutQuery = <
      TData = LogoutQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: LogoutQueryVariables,
      options?: UseQueryOptions<LogoutQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<LogoutQuery, TError, TData>(
      variables === undefined ? ['Logout'] : ['Logout', variables],
      fetcher<LogoutQuery, LogoutQueryVariables>(client, LogoutDocument, variables, headers),
      options
    )};

export const LoginDocument = `
    mutation Login($input: LoginInput!) {
  login(loginInput: $input) {
    id
    name
    user_name
    email
    last_name
    roles {
      name
    }
  }
}
    `;

export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['Login'],
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    )};

export const GetMeDocument = `
    query getMe {
  me {
    userId
    roles {
      name
    }
  }
}
    `;

export const useGetMeQuery = <
      TData = GetMeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetMeQueryVariables,
      options?: UseQueryOptions<GetMeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetMeQuery, TError, TData>(
      variables === undefined ? ['getMe'] : ['getMe', variables],
      fetcher<GetMeQuery, GetMeQueryVariables>(client, GetMeDocument, variables, headers),
      options
    )};

export const CreateUserDocument = `
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

export const useCreateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      ['CreateUser'],
      (variables?: CreateUserMutationVariables) => fetcher<CreateUserMutation, CreateUserMutationVariables>(client, CreateUserDocument, variables, headers)(),
      options
    )};

export const CreateRequestEventDocument = `
    mutation CreateRequestEvent($input: CreateRequestEventInput!) {
  createRequestEvent(createRequestEventInput: $input) {
    id
    createdAt
    status
    title
  }
}
    `;

export const useCreateRequestEventMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateRequestEventMutation, TError, CreateRequestEventMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<CreateRequestEventMutation, TError, CreateRequestEventMutationVariables, TContext>(
      ['CreateRequestEvent'],
      (variables?: CreateRequestEventMutationVariables) => fetcher<CreateRequestEventMutation, CreateRequestEventMutationVariables>(client, CreateRequestEventDocument, variables, headers)(),
      options
    )};

export const RolesListDocument = `
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

export const useRolesListQuery = <
      TData = RolesListQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: RolesListQueryVariables,
      options?: UseQueryOptions<RolesListQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<RolesListQuery, TError, TData>(
      variables === undefined ? ['RolesList'] : ['RolesList', variables],
      fetcher<RolesListQuery, RolesListQueryVariables>(client, RolesListDocument, variables, headers),
      options
    )};

export const GetListOfRequestsEventsByUserIdDocument = `
    query GetListOfRequestsEventsByUserId($input: GetRequestsEventsByUserIdInput!) {
  getListOfRequestsEventsByUserId(getRequestsEventsByUserId: $input) {
    id
    status
    title
    createdAt
    requestedBy {
      id
      name
      user_name
    }
  }
}
    `;

export const useGetListOfRequestsEventsByUserIdQuery = <
      TData = GetListOfRequestsEventsByUserIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetListOfRequestsEventsByUserIdQueryVariables,
      options?: UseQueryOptions<GetListOfRequestsEventsByUserIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetListOfRequestsEventsByUserIdQuery, TError, TData>(
      ['GetListOfRequestsEventsByUserId', variables],
      fetcher<GetListOfRequestsEventsByUserIdQuery, GetListOfRequestsEventsByUserIdQueryVariables>(client, GetListOfRequestsEventsByUserIdDocument, variables, headers),
      options
    )};
