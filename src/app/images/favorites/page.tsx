export default function FavoriteImagesPage() {
  return (
    <div className="container mx-auto">
      <h2>FavoriteImages Page, private route!</h2>
      <p>
        If the user isn`t authorized, show him the warning message, offer to him
        to signin, signup or to go to the images page
      </p>
    </div>
  );
}
