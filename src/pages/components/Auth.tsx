import React from "react";
import { signIn } from "next-auth/react";

const Auth = () => {
  return (
    <div>
      <button
        className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-800"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => signIn("github")}
      >
        Sign in with GitHub
      </button>
    </div>
  );
};

export default Auth;
