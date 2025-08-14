export interface Badge {
  id: string;
  name: string;
  
  // createdAt: string;
  // updatedAt: string;
}
export  interface BadgeErrors {
  name: string;
}

export interface BadgeFormData {
  name: string;
}

export type CreateBadgeDto = BadgeFormData;

export interface UpdateBadgeDto extends Partial<BadgeFormData> {}