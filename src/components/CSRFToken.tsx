// CSRFToken.tsx
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const CSRFToken = () => {
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const csrfToken = Cookies.get("csrftoken"); // Fetch the CSRF token from cookies
    console.log("CSRF Token fetched:", csrfToken); // Log the fetched token
    setToken(csrfToken);
  }, []);

  if (!token) {
    return null; // Render nothing if the token isn't available yet
  }

  return (
    <input type="hidden" name="csrfmiddlewaretoken" value={token} />
  );
};

export default CSRFToken;
