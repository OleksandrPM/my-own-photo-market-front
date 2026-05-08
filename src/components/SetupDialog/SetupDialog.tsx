import { useState } from "react";

export type SetupDialogProps = {
  getChoice: (choice: boolean) => void;
};

export default function SetupDialog({ getChoice }: SetupDialogProps) {
  const [choice, setChoice] = useState<boolean | null>(null);

  const handleClick = () => {
    if (choice !== null) {
      getChoice(choice);
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6 space-y-6">
      <h3>Warning: Initial Admin setup is already enabled</h3>
      <p>
        If you own an initial admin credentials, you can use them to create
        initial admin user.
      </p>
      <div>
        <input
          type="radio"
          id="setupYes"
          name="setupOption"
          onChange={() => setChoice(true)}
        />
        <label htmlFor="setupYes">
          Yes, I want to create initial admin user
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="setupNo"
          name="setupOption"
          onChange={() => setChoice(false)}
        />
        <label htmlFor="setupNo">
          No, I do not own initial admin credentials and just want to sign up
        </label>
      </div>

      <button
        onClick={handleClick}
        disabled={choice === null}
        className="
    ml-4 px-4 py-2 rounded
    bg-blue-500 text-white
    transition-colors duration-200
    enabled:hover:bg-blue-600
    enabled:active:bg-blue-700
    enabled:focus:outline-none enabled:focus:ring-2 enabled:focus:ring-blue-400

    disabled:opacity-100
    disabled:cursor-not-allowed
    disabled:bg-blue-300
  "
      >
        Confirm choice
      </button>
    </div>
  );
}
