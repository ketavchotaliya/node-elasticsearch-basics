import { Request } from 'express';

declare namespace ValidateJWT {
  // LoggedIn User in Req
  interface LoggedInUserDetails extends Request {
    logged_in_user_id?: number;
    logged_in_user_org_id?: number;
    logged_in_user_role_id?: number;
    org_id?: number;
  }
  
  // EasyMIS Request User in Req
  interface EasyMISDetails extends LoggedInUserDetails {
    request_api_id?: number;
    org_details?: any;
    easyMISHeader?: any;
  }
}

export = ValidateJWT;
