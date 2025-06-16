export interface CategoryData {
  id: string;
  name: string;
  image: string;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  prep: string;
  cook: string;
  serving: number;
  categoryId: string;
  ingredients: string[];
  steps: string[];
  authorId?: string;
  createdAt?: Date;
}

export interface Comment {
  id?: string;
  text: string;
  authorId: string;
  createdAt: Date;
}

export interface TimeOption {
  id: string;
  time: string;
}

export interface Servings {
  id: string;
  serving: string;
}

  
 
  