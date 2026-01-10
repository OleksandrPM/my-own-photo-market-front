import { useAppDispatch, useAppSelector } from "lib/hooks/react-redux-hooks";
import { getSelectedTags } from "lib/redux/features/tags/tagsSelectors";
import { toggleSelectedTag } from "lib/redux/features/tags/tagsSlice";
import { Tag } from "types/tag";

export interface TagsCheckboxListProps {
  renderedTags: Tag["tag"][];
  title?: string;
}

export default function TagsCheckboxList({
  renderedTags,
  title,
}: TagsCheckboxListProps) {
  const dispatch = useAppDispatch();
  const selectedTags = useAppSelector(getSelectedTags);

  const handleSelect = (tagName: string) => {
    dispatch(toggleSelectedTag(tagName));
  };

  return (
    <div>
      {title && <h4 className="font-medium mb-2">{title}</h4>}
      <ul className="">
        {renderedTags.map((tag) => (
          <li className="" key={tag}>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => handleSelect(tag)}
              title={tag}
            />
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
