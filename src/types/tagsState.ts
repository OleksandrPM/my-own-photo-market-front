import { Tag } from "./tag";

// TODO: think about if I need selectedTags here or not
export interface TagsState {
  tags: Tag[];
  selectedTags: Tag[];
  isLoading: boolean;
  error: string | null;
}
