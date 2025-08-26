export interface UserEntity {
  id: string; // uuid
  is_verified: boolean;
  created_at: string; // ISO timestamp
  password_hash: string;
  profile_picture_url?: string | null;
  bio?: string | null;
  username: string;
  email: string;
}

// Example default values for creation (not for DB schema)
export const defaultUserEntity: Omit<UserEntity, 'id' | 'created_at'> = {
  is_verified: false,
  password_hash: '',
  profile_picture_url: null,
  bio: null,
  username: '',
  email: '',
};
