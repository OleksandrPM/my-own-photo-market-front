import { RootState } from "lib/redux/store";
import { Tag } from "types/tag";

export const getTags = (state: RootState): Tag[] => state.tags;
