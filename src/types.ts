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
  serving: string;
  categoryId: string;
  ingredients: string[];
  steps: string[];
  author?: string;
  createdAt?: Date;
  comments?: Comment[];
}

export interface Comment {
  id?: string;
  text: string;
  author: string;
  createdAt?: Date;
}

export interface TimeOption {
  id: string;
  time: string;
}

export interface Servings {
  id: string;
  serving: string;
}

  
 
  