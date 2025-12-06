import ThemeSwitch from "components/ThemeSwitch";
import Logo from "../Logo";
import TagSearch from "../TagSearch";
import UserBar from "../UserBar";

export default function Header() {
  return (
    <header>
      <div className="container mx-auto flex justify-between">
        <Logo />
        <TagSearch />
        <ThemeSwitch />
        <UserBar />
      </div>
    </header>
  );
}
