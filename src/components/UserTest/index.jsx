// COMPOSANT DE TEST TEMPORAIRE - a supprimer une fois la validation terminee
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, registerThunk } from "../../thunkActionsCreator/userThunks";
import { logout } from "../../slices/userSlice";

export default function UserTest() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginThunk({ username, password }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(
      registerThunk({
        username: regUsername,
        email: regEmail,
        password: regPassword,
      }),
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={{ padding: 20, fontFamily: "monospace" }}>
      <h2>Test temporaire - user</h2>

      <h3>Connexion</h3>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="identifiant"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={user.loading}>
          {user.loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <h3>Inscription</h3>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="identifiant"
          value={regUsername}
          onChange={(e) => setRegUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={regEmail}
          onChange={(e) => setRegEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="mot de passe"
          value={regPassword}
          onChange={(e) => setRegPassword(e.target.value)}
        />
        <button type="submit" disabled={user.loading}>
          {user.loading ? "Creation..." : "Creer un compte"}
        </button>
      </form>

      <button onClick={handleLogout}>Se deconnecter</button>

      <h3>State user actuel :</h3>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
