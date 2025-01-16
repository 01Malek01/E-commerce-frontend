import { signOut } from "supertokens-auth-react/recipe/emailpassword";

export default function Home() {
  return (
    <div>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
