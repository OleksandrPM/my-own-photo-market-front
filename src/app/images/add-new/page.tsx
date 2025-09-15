export default function AddNewPage() {
  return (
    <>
      <h2>AddNew Page, private, only for admin!</h2>
      <p>
        If the user isn`t authorized, show him the warning message, offer to him
        to signin, signup or to go to the images page <br />
        If the user isn`t an admin, show him the alert warning message, redirect
        him to the images page
      </p>
    </>
  );
}
