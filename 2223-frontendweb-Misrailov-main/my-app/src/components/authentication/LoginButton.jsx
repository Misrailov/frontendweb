import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';
import "../../App.css"
function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = useCallback(

    async () => {
      loginWithRedirect();
    },
    [loginWithRedirect],
  );

  return (
    <div>
          <i className={ " ms-1 me-2 fa-solid fa-user "}  ></i>

    <button
      type="button"
     
      className={"w-10 btn btn-primary "}
      onClick={handleLogin}
    >
      Log In
    </button>
    </div>
  );
}

export default LoginButton;
