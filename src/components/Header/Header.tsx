import Logo from "../Logo";
import TagsSearchingInput from "../TagsSearchingInput";
import UserBar from "../UserBar";

export default function Header() {
  return (
    <header className="w-full flex justify-between">
      <Logo />
      <TagsSearchingInput />
      <UserBar />
    </header>
  );
}
