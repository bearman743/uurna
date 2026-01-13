
export enum WoodType {
  BIRCH = 'Birch' // Display name handled in translations
}

export enum UrnSize {
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'Large'
}

export type Language = 'fi' | 'en' | 'sv';

export const WOOD_COLORS: Record<WoodType, string> = {
  [WoodType.BIRCH]: 'bg-[#f3eadd]', // Pale Cream
};

export const WOOD_TEXT_COLORS: Record<WoodType, string> = {
  [WoodType.BIRCH]: 'text-[#4a3b32]',
};

export const URN_DIMENSIONS: Record<UrnSize, string> = {
  [UrnSize.SMALL]: '10 x 10 x 10 cm (approx. 0.6L)',
  [UrnSize.MEDIUM]: '15 x 15 x 15 cm (approx. 1.8L)',
  [UrnSize.LARGE]: '20 x 20 x 20 cm (approx. 3.5L)'
};

export type Side = 'front' | 'right' | 'back' | 'left';

export interface SideContent {
  photoUrl: string | null;
  text: string;
}

export interface MemorialData {
  petName: string;
  birthDate: string;
  passingDate: string;
  woodType: WoodType;
  size: UrnSize;
  sides: Record<Side, SideContent>;
}