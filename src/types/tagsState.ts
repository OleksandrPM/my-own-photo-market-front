import { Tag } from "./tag";

// TODO: think about if I need selectedTags here or not
export interface TagsState {
  allTags: Tag[];
  selectedTags: string[];
  newTags: string[];
  isTagsLoading: boolean;
  error: string | null;
}
