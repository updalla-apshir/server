import { Request, Response } from 'express';

// Common interfaces
export interface IBaseEntity {
  id: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IAuditableEntity extends IBaseEntity {
  createdBy?: number;
  updatedBy?: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface IRequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    role: string;
  };
}

export interface IConfig {
  port: number;
  database: {
    url: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  redis: {
    url: string;
  };
  cors: {
    origin: string[];
    credentials: boolean;
  };
  rateLimit: {
    ttl: number;
    limit: number;
  };
}

// Repository interfaces
export interface IRepositoryOptions {
  include?: any;
  select?: any;
  orderBy?: any;
  skip?: number;
  take?: number;
}

export interface IFindManyOptions extends IRepositoryOptions {
  where?: any;
}

export interface IFindOneOptions extends IRepositoryOptions {
  where?: any;
}

// Service interfaces
export interface IServiceOptions {
  includeAudit?: boolean;
  skipValidation?: boolean;
}

// Controller interfaces
export interface IControllerOptions {
  transform?: boolean;
  serialize?: boolean;
}
