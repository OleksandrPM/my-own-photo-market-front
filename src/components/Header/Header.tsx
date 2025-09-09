import ThemeSwitch from "components/ThemeSwitch";
import Logo from "../Logo";
import TagsSearchingInput from "../TagsSearchingInput";
import UserBar from "../UserBar";

export default function Header() {
  return (
    <header>
      <div className="container mx-auto flex justify-between">
        <Logo />
        <TagsSearchingInput />
        <ThemeSwitch />
        <UserBar />
      </div>
    </header>
  );
}
