import { Tag } from "./tag";

// TODO: think about if I need selectedTags here or not
export interface TagsState {
  allTags: Tag["name"][];
  selectedTags: Tag["name"][];
  isTagsLoading: boolean;
  error: string | null;
}
