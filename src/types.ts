
export interface CategoryData {
  id: string;
  name: string;
  image: string;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  prep: string ;
  cook:  string;
  serving: number;
  categoryId: string;
  ingredients: string[];
  steps: string[];
}

export interface Comment {
  id?: string;
  text: string;
  createdAt?: Date;
}
  
 
  