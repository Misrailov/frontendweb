import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import "../../App.css"

export default function AuthenticationButton() {
  const {
    isAuthenticated,
    user,
  } = useAuth0(); // 👈 1

  if (isAuthenticated) { // 👈 2
    const { name, picture, givenName } = user;
    return (
      <div className="d-flex flex-row align-items-center">
        <div className="col">
          <img src={picture} alt={givenName} className="profilePicture"/>
        </div>
        <div className="col">
         <p  className="profileText"> {name}</p>
        </div>
        <div className="buttonAuth" >
          <LogoutButton />
        </div>
      </div>
    );
  }

  return <LoginButton />;
}
