import { UserActiveStatus, UserRoles } from '@/core/common/enums/UserEnums';
import { Request } from 'express';

export type HttpUserPayload = {
  id: string;
  first_name: string;
  last_name: string;
  cpf: string;
  email: string;
  role: UserRoles;
  isActive: UserActiveStatus;
};

export type HttpRequestWithUser = Request & { user: HttpUserPayload };

export type HttpJwtPayload = {
  id: string;
};

export type HttpLoggedInUser = {
  user: HttpUserPayload;
  accessToken: string;
};
