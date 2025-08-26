export interface VerificationTokenEntity {
  user_id: string; // uuid
  expires_at: string; // ISO timestamp
  used: boolean;
  token: string;
  type: string;
}

// Example default values for creation (not for DB schema)
export const defaultVerificationTokenEntity: Omit<VerificationTokenEntity, 'user_id' | 'expires_at' | 'token'> = {
  used: false,
  type: '',
};
