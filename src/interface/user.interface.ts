export interface AuthenticatedRequest extends Request {
    user: { pk: number; username: string }; // Adjust the type according to your user object
  }