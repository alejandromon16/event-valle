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

export type ApproveRequestEventInput = {
  approverId: Scalars['String']['input'];
  requestEventId: Scalars['String']['input'];
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
  address: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['String']['input']>;
  locationName: Scalars['String']['input'];
  requestedById: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
  subtitle: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateRoleInput = {
  description: Scalars['String']['input'];
  name: RoleType;
};

export type CreateUserInput = {
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
  requestEvent?: Maybe<RequestEventEntity>;
  startDate: Scalars['DateTime']['output'];
  status: EventStatus;
  subtitle: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type EventEntityWithInfoOfUser = {
  __typename?: 'EventEntityWithInfoOfUser';
  address: Scalars['String']['output'];
  amountOfLikes: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  images: Array<Scalars['String']['output']>;
  isLiked: Scalars['Boolean']['output'];
  isSaved: Scalars['Boolean']['output'];
  latitud?: Maybe<Scalars['Float']['output']>;
  locationDetail?: Maybe<Scalars['String']['output']>;
  locationName: Scalars['String']['output'];
  longitud?: Maybe<Scalars['Float']['output']>;
  principalImage: Scalars['String']['output'];
  requestEvent?: Maybe<RequestEventEntity>;
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

export type GetEventByIdInput = {
  eventId: Scalars['String']['input'];
};

export type GetListByRequesterIdInput = {
  requesterId: Scalars['String']['input'];
};

export type GetListOfEventsInput = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type GetListOfEventsSavedByUserIdInput = {
  userId: Scalars['String']['input'];
};

export type GetRequestEventByIdInput = {
  requestEventId: Scalars['String']['input'];
};

export type GetRequestsEventsByUserIdInput = {
  userId: Scalars['String']['input'];
};

export type LikedEventInput = {
  eventId: Scalars['String']['input'];
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
  addLike: EventEntity;
  approveRequestEvent: RequestEventEntity;
  assignRolesToUser: UserEntity;
  createEvent: EventEntity;
  createRequestEvent: RequestEventEntity;
  createRole: RoleEntity;
  createUser: UserEntity;
  login: UserEntity;
  logout: LogoutEntity;
  publishEvent: EventEntity;
  rejectRequestEvent: RequestEventEntity;
  removeLike: EventEntity;
  removeUser: UserEntity;
  requestPasswordReset: UserEntity;
  resetPassword: UserEntity;
  saveEventByUser: EventEntity;
  unPublishEvent: EventEntity;
  unSaveEventByUser: EventEntity;
  updateEvent: EventEntity;
  updateUser: UserEntity;
  validatePasswordResetToken: ValidatePasswordResetTokenEntity;
};


export type MutationAddLikeArgs = {
  likedEventInput: LikedEventInput;
};


export type MutationApproveRequestEventArgs = {
  approveRequestEventInput: ApproveRequestEventInput;
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


export type MutationPublishEventArgs = {
  publishEventInput: PublishEventInput;
};


export type MutationRejectRequestEventArgs = {
  approveRequestEventInput: ApproveRequestEventInput;
};


export type MutationRemoveLikeArgs = {
  likedEventInput: LikedEventInput;
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


export type MutationSaveEventByUserArgs = {
  saveEventInput: SaveEventInput;
};


export type MutationUnPublishEventArgs = {
  unPublishEventInput: UnPublishEventInput;
};


export type MutationUnSaveEventByUserArgs = {
  saveEventInput: SaveEventInput;
};


export type MutationUpdateEventArgs = {
  updateEventInput: UpdateEventInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationValidatePasswordResetTokenArgs = {
  validatePasswordResetTokenInput: ValidatePasswordResetTokenInput;
};

export type PublishEventInput = {
  eventId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  findRoleByName: RoleEntity;
  getAmountOfDraftEvents: Scalars['Int']['output'];
  getAmountOfPublishEvents: Scalars['Int']['output'];
  getEventById: EventEntity;
  getListOfEvents: Array<EventEntity>;
  getListOfEventsByRequesterId: Array<EventEntity>;
  getListOfEventsForThisMonth: Array<EventEntity>;
  getListOfEventsForThisWeek: Array<EventEntityWithInfoOfUser>;
  getListOfEventsSavedByUserId: Array<EventEntity>;
  getListOfRequestsEvents: Array<RequestEventEntity>;
  getListOfRequestsEventsByUserId: Array<RequestEventEntity>;
  getRequestEventById: RequestEventEntity;
  listUsers: Array<UserEntity>;
  me: MeEntity;
  retrieveUser: UserEntity;
  rolesList: Array<RoleEntity>;
};


export type QueryFindRoleByNameArgs = {
  findRoleByName: FindRoleByNameInput;
};


export type QueryGetEventByIdArgs = {
  getEventByIdInput: GetEventByIdInput;
};


export type QueryGetListOfEventsByRequesterIdArgs = {
  getListOfEventsByRequesterIdInput: GetListByRequesterIdInput;
};


export type QueryGetListOfEventsForThisWeekArgs = {
  getListOfEventsInput: GetListOfEventsInput;
};


export type QueryGetListOfEventsSavedByUserIdArgs = {
  getListOfEventsSavedByUserIdInput: GetListOfEventsSavedByUserIdInput;
};


export type QueryGetListOfRequestsEventsByUserIdArgs = {
  getRequestsEventsByUserId: GetRequestsEventsByUserIdInput;
};


export type QueryGetRequestEventByIdArgs = {
  getRequestEventById: GetRequestEventByIdInput;
};


export type QueryRetrieveUserArgs = {
  id: Scalars['String']['input'];
};

export type RequestEventEntity = {
  __typename?: 'RequestEventEntity';
  address: Scalars['String']['output'];
  approvedBy?: Maybe<UserEntity>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  locationDetail?: Maybe<Scalars['String']['output']>;
  locationName: Scalars['String']['output'];
  requestedBy?: Maybe<UserEntity>;
  startDate: Scalars['DateTime']['output'];
  status: RequestEventStatus;
  subtitle: Scalars['String']['output'];
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
  Marketing = 'MARKETING',
  RequestApprover = 'REQUEST_APPROVER',
  SuperAdmin = 'SUPER_ADMIN',
  User = 'USER'
}

export type SaveEventInput = {
  eventId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type UnPublishEventInput = {
  eventId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type UpdateEventInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['String']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  locationName?: InputMaybe<Scalars['String']['input']>;
  principalImage?: InputMaybe<Scalars['String']['input']>;
  requestEventId?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
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


export type GetListOfRequestsEventsQuery = { __typename?: 'Query', getListOfRequestsEvents: Array<{ __typename?: 'RequestEventEntity', id: string, status: RequestEventStatus, title: string, createdAt?: string | null, requestedBy?: { __typename?: 'UserEntity', id: string, name: string, user_name: string } | null }> };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutEntity', status: string } };

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

export type GetListOfEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfEventsQuery = { __typename?: 'Query', getListOfEvents: Array<{ __typename?: 'EventEntity', address: string, createdAt: string, description: string, endDate?: any | null, id: string, images: Array<string>, latitud?: number | null, locationDetail?: string | null, locationName: string, longitud?: number | null, principalImage: string, startDate: any, status: EventStatus, subtitle: string, tags: Array<string>, title: string, updatedAt: string, requestEvent?: { __typename?: 'RequestEventEntity', id: string, approvedBy?: { __typename?: 'UserEntity', id: string, user_name: string, name: string, last_name: string } | null, requestedBy?: { __typename?: 'UserEntity', id: string, user_name: string, name: string, last_name: string } | null } | null }> };

export type GetRequestEventByIdQueryVariables = Exact<{
  input: GetRequestEventByIdInput;
}>;


export type GetRequestEventByIdQuery = { __typename?: 'Query', getRequestEventById: { __typename?: 'RequestEventEntity', id: string, title: string, subtitle: string, description: string, startDate: any, endDate?: any | null, locationName: string, locationDetail?: string | null, address: string, createdAt?: string | null, status: RequestEventStatus, requestedBy?: { __typename?: 'UserEntity', id: string, name: string, last_name: string, user_name: string, email: string } | null } };

export type GetListOfEventByRequesterIdQueryVariables = Exact<{
  input: GetListByRequesterIdInput;
}>;


export type GetListOfEventByRequesterIdQuery = { __typename?: 'Query', getListOfEventsByRequesterId: Array<{ __typename?: 'EventEntity', address: string, createdAt: string, description: string, endDate?: any | null, id: string, images: Array<string>, latitud?: number | null, locationDetail?: string | null, locationName: string, longitud?: number | null, principalImage: string, startDate: any, status: EventStatus, subtitle: string, tags: Array<string>, title: string, updatedAt: string, requestEvent?: { __typename?: 'RequestEventEntity', id: string, approvedBy?: { __typename?: 'UserEntity', id: string, user_name: string, name: string, last_name: string } | null, requestedBy?: { __typename?: 'UserEntity', id: string, user_name: string, name: string, last_name: string } | null } | null }> };

export type GetEventByIdQueryVariables = Exact<{
  input: GetEventByIdInput;
}>;


export type GetEventByIdQuery = { __typename?: 'Query', getEventById: { __typename?: 'EventEntity', address: string, createdAt: string, description: string, endDate?: any | null, id: string, images: Array<string>, latitud?: number | null, locationDetail?: string | null, locationName: string, longitud?: number | null, principalImage: string, startDate: any, status: EventStatus, subtitle: string, tags: Array<string>, title: string, updatedAt: string, requestEvent?: { __typename?: 'RequestEventEntity', id: string, approvedBy?: { __typename?: 'UserEntity', id: string, user_name: string, name: string, last_name: string } | null, requestedBy?: { __typename?: 'UserEntity', id: string, user_name: string, name: string, last_name: string } | null } | null } };

export type PublishEventMutationVariables = Exact<{
  input: PublishEventInput;
}>;


export type PublishEventMutation = { __typename?: 'Mutation', publishEvent: { __typename?: 'EventEntity', id: string } };

export type UnPublishEventMutationVariables = Exact<{
  input: UnPublishEventInput;
}>;


export type UnPublishEventMutation = { __typename?: 'Mutation', unPublishEvent: { __typename?: 'EventEntity', status: EventStatus, id: string, title: string } };

export type RejectRequestEventMutationVariables = Exact<{
  input: ApproveRequestEventInput;
}>;


export type RejectRequestEventMutation = { __typename?: 'Mutation', rejectRequestEvent: { __typename?: 'RequestEventEntity', id: string } };

export type ApproveRequestEventMutationVariables = Exact<{
  input: ApproveRequestEventInput;
}>;


export type ApproveRequestEventMutation = { __typename?: 'Mutation', approveRequestEvent: { __typename?: 'RequestEventEntity', id: string } };

export type UpdateEventMutationVariables = Exact<{
  input: UpdateEventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent: { __typename?: 'EventEntity', address: string, createdAt: string, description: string, endDate?: any | null, id: string, images: Array<string>, latitud?: number | null, locationDetail?: string | null, locationName: string, longitud?: number | null, principalImage: string, startDate: any, status: EventStatus, subtitle: string, tags: Array<string>, title: string, updatedAt: string, requestEvent?: { __typename?: 'RequestEventEntity', id: string, approvedBy?: { __typename?: 'UserEntity', id: string, user_name: string, name: string, last_name: string } | null, requestedBy?: { __typename?: 'UserEntity', id: string, user_name: string, name: string, last_name: string } | null } | null } };

export type GetAmountOfDraftEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAmountOfDraftEventsQuery = { __typename?: 'Query', getAmountOfDraftEvents: number };

export type GetAmountOfPublishEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAmountOfPublishEventsQuery = { __typename?: 'Query', getAmountOfPublishEvents: number };



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
    createdAt
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
    mutation Logout {
  logout {
    status
  }
}
    `;

export const useLogoutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
      ['Logout'],
      (variables?: LogoutMutationVariables) => fetcher<LogoutMutation, LogoutMutationVariables>(client, LogoutDocument, variables, headers)(),
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

export const GetListOfEventsDocument = `
    query GetListOfEvents {
  getListOfEvents {
    address
    createdAt
    description
    endDate
    id
    images
    latitud
    locationDetail
    locationName
    longitud
    principalImage
    startDate
    status
    subtitle
    tags
    title
    updatedAt
    requestEvent {
      id
      approvedBy {
        id
        user_name
        name
        last_name
      }
      requestedBy {
        id
        user_name
        name
        last_name
      }
    }
  }
}
    `;

export const useGetListOfEventsQuery = <
      TData = GetListOfEventsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetListOfEventsQueryVariables,
      options?: UseQueryOptions<GetListOfEventsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetListOfEventsQuery, TError, TData>(
      variables === undefined ? ['GetListOfEvents'] : ['GetListOfEvents', variables],
      fetcher<GetListOfEventsQuery, GetListOfEventsQueryVariables>(client, GetListOfEventsDocument, variables, headers),
      options
    )};

export const GetRequestEventByIdDocument = `
    query GetRequestEventById($input: GetRequestEventByIdInput!) {
  getRequestEventById(getRequestEventById: $input) {
    id
    title
    subtitle
    description
    startDate
    endDate
    locationName
    locationDetail
    address
    createdAt
    status
    requestedBy {
      id
      name
      last_name
      user_name
      email
    }
  }
}
    `;

export const useGetRequestEventByIdQuery = <
      TData = GetRequestEventByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetRequestEventByIdQueryVariables,
      options?: UseQueryOptions<GetRequestEventByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetRequestEventByIdQuery, TError, TData>(
      ['GetRequestEventById', variables],
      fetcher<GetRequestEventByIdQuery, GetRequestEventByIdQueryVariables>(client, GetRequestEventByIdDocument, variables, headers),
      options
    )};

export const GetListOfEventByRequesterIdDocument = `
    query GetListOfEventByRequesterId($input: GetListByRequesterIdInput!) {
  getListOfEventsByRequesterId(getListOfEventsByRequesterIdInput: $input) {
    address
    createdAt
    description
    endDate
    id
    images
    latitud
    locationDetail
    locationName
    longitud
    principalImage
    startDate
    status
    subtitle
    tags
    title
    updatedAt
    requestEvent {
      id
      approvedBy {
        id
        user_name
        name
        last_name
      }
      requestedBy {
        id
        user_name
        name
        last_name
      }
    }
  }
}
    `;

export const useGetListOfEventByRequesterIdQuery = <
      TData = GetListOfEventByRequesterIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetListOfEventByRequesterIdQueryVariables,
      options?: UseQueryOptions<GetListOfEventByRequesterIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetListOfEventByRequesterIdQuery, TError, TData>(
      ['GetListOfEventByRequesterId', variables],
      fetcher<GetListOfEventByRequesterIdQuery, GetListOfEventByRequesterIdQueryVariables>(client, GetListOfEventByRequesterIdDocument, variables, headers),
      options
    )};

export const GetEventByIdDocument = `
    query GetEventById($input: GetEventByIdInput!) {
  getEventById(getEventByIdInput: $input) {
    address
    createdAt
    description
    endDate
    id
    images
    latitud
    locationDetail
    locationName
    longitud
    principalImage
    startDate
    status
    subtitle
    tags
    title
    updatedAt
    requestEvent {
      id
      approvedBy {
        id
        user_name
        name
        last_name
      }
      requestedBy {
        id
        user_name
        name
        last_name
      }
    }
  }
}
    `;

export const useGetEventByIdQuery = <
      TData = GetEventByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetEventByIdQueryVariables,
      options?: UseQueryOptions<GetEventByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetEventByIdQuery, TError, TData>(
      ['GetEventById', variables],
      fetcher<GetEventByIdQuery, GetEventByIdQueryVariables>(client, GetEventByIdDocument, variables, headers),
      options
    )};

export const PublishEventDocument = `
    mutation publishEvent($input: PublishEventInput!) {
  publishEvent(publishEventInput: $input) {
    id
  }
}
    `;

export const usePublishEventMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<PublishEventMutation, TError, PublishEventMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<PublishEventMutation, TError, PublishEventMutationVariables, TContext>(
      ['publishEvent'],
      (variables?: PublishEventMutationVariables) => fetcher<PublishEventMutation, PublishEventMutationVariables>(client, PublishEventDocument, variables, headers)(),
      options
    )};

export const UnPublishEventDocument = `
    mutation UnPublishEvent($input: UnPublishEventInput!) {
  unPublishEvent(unPublishEventInput: $input) {
    status
    id
    title
  }
}
    `;

export const useUnPublishEventMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UnPublishEventMutation, TError, UnPublishEventMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<UnPublishEventMutation, TError, UnPublishEventMutationVariables, TContext>(
      ['UnPublishEvent'],
      (variables?: UnPublishEventMutationVariables) => fetcher<UnPublishEventMutation, UnPublishEventMutationVariables>(client, UnPublishEventDocument, variables, headers)(),
      options
    )};

export const RejectRequestEventDocument = `
    mutation rejectRequestEvent($input: ApproveRequestEventInput!) {
  rejectRequestEvent(approveRequestEventInput: $input) {
    id
  }
}
    `;

export const useRejectRequestEventMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RejectRequestEventMutation, TError, RejectRequestEventMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<RejectRequestEventMutation, TError, RejectRequestEventMutationVariables, TContext>(
      ['rejectRequestEvent'],
      (variables?: RejectRequestEventMutationVariables) => fetcher<RejectRequestEventMutation, RejectRequestEventMutationVariables>(client, RejectRequestEventDocument, variables, headers)(),
      options
    )};

export const ApproveRequestEventDocument = `
    mutation approveRequestEvent($input: ApproveRequestEventInput!) {
  approveRequestEvent(approveRequestEventInput: $input) {
    id
  }
}
    `;

export const useApproveRequestEventMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ApproveRequestEventMutation, TError, ApproveRequestEventMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<ApproveRequestEventMutation, TError, ApproveRequestEventMutationVariables, TContext>(
      ['approveRequestEvent'],
      (variables?: ApproveRequestEventMutationVariables) => fetcher<ApproveRequestEventMutation, ApproveRequestEventMutationVariables>(client, ApproveRequestEventDocument, variables, headers)(),
      options
    )};

export const UpdateEventDocument = `
    mutation UpdateEvent($input: UpdateEventInput!) {
  updateEvent(updateEventInput: $input) {
    address
    createdAt
    description
    endDate
    id
    images
    latitud
    locationDetail
    locationName
    longitud
    principalImage
    startDate
    status
    subtitle
    tags
    title
    updatedAt
    requestEvent {
      id
      approvedBy {
        id
        user_name
        name
        last_name
      }
      requestedBy {
        id
        user_name
        name
        last_name
      }
    }
  }
}
    `;

export const useUpdateEventMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateEventMutation, TError, UpdateEventMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<UpdateEventMutation, TError, UpdateEventMutationVariables, TContext>(
      ['UpdateEvent'],
      (variables?: UpdateEventMutationVariables) => fetcher<UpdateEventMutation, UpdateEventMutationVariables>(client, UpdateEventDocument, variables, headers)(),
      options
    )};

export const GetAmountOfDraftEventsDocument = `
    query GetAmountOfDraftEvents {
  getAmountOfDraftEvents
}
    `;

export const useGetAmountOfDraftEventsQuery = <
      TData = GetAmountOfDraftEventsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetAmountOfDraftEventsQueryVariables,
      options?: UseQueryOptions<GetAmountOfDraftEventsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetAmountOfDraftEventsQuery, TError, TData>(
      variables === undefined ? ['GetAmountOfDraftEvents'] : ['GetAmountOfDraftEvents', variables],
      fetcher<GetAmountOfDraftEventsQuery, GetAmountOfDraftEventsQueryVariables>(client, GetAmountOfDraftEventsDocument, variables, headers),
      options
    )};

export const GetAmountOfPublishEventsDocument = `
    query GetAmountOfPublishEvents {
  getAmountOfPublishEvents
}
    `;

export const useGetAmountOfPublishEventsQuery = <
      TData = GetAmountOfPublishEventsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetAmountOfPublishEventsQueryVariables,
      options?: UseQueryOptions<GetAmountOfPublishEventsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetAmountOfPublishEventsQuery, TError, TData>(
      variables === undefined ? ['GetAmountOfPublishEvents'] : ['GetAmountOfPublishEvents', variables],
      fetcher<GetAmountOfPublishEventsQuery, GetAmountOfPublishEventsQueryVariables>(client, GetAmountOfPublishEventsDocument, variables, headers),
      options
    )};
