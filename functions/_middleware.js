function unauthorized() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Prototype"',
    },
  });
}

function decodeCredentials(authorization) {
  const match = authorization.match(/^Basic\s+([^\s]+)$/i);
  if (!match) return null;

  try {
    const decoded = atob(match[1]);
    const separator = decoded.indexOf(":");

    if (separator < 0) return null;

    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

export async function onRequest(context) {
  const expectedUsername = context.env.BASIC_AUTH_USERNAME;
  const expectedPassword = context.env.BASIC_AUTH_PASSWORD;

  if (
    typeof expectedUsername !== "string" ||
    expectedUsername.length === 0 ||
    typeof expectedPassword !== "string" ||
    expectedPassword.length === 0
  ) {
    return new Response("Basic authentication is not configured.", {
      status: 503,
    });
  }

  const authorization = context.request.headers.get("Authorization");
  const credentials = authorization
    ? decodeCredentials(authorization)
    : null;

  if (
    !credentials ||
    credentials.username !== expectedUsername ||
    credentials.password !== expectedPassword
  ) {
    return unauthorized();
  }

  return context.next();
}
