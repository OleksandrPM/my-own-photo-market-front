import { Tag } from "./tag";

// TODO: think about if I need selectedTags here or not
export interface TagsState {
  allTags: Tag["tag"][];
  selectedTags: Tag["tag"][];
  isTagsLoading: boolean;
  error: string | null;
}
