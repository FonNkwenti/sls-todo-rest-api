const { CognitoJwtVerifier } = require("aws-jwt-verify"); // JWT verification library from amazon for cognito. We are deconstructing the CognitoJwtVerifier method to use
// the libary will check if the token is generated from our user pool and if the token is expired and it will support user pool groups and also handle error.

const userPoolId = process.env.COGNITO_USERPOOL_ID;
const clientId = process.env.COGNITO_WEB_CLIENT_ID;

const jwtVerifier = CognitoJwtVerifier.create({
  tokenUse: "id", // we will use id token in place of access token because id token has some information about the user
  // userPoolId: "us-east-1_cilW6Plk9", // copy the user pool ID from the Cognito user pool console
  // clientId: "1lgthkk5tclh7f901iu7lhotqm", // get the client ID from the cognito console

  userPoolId, // replacing the hard-coded user pool with that gotten from SLS environment variables
  clientId, // replacing the hard-coded user pool with that gotten from SLS environment variables
});

const generatePolicy = (principalId, effect, resource) => {
  let authResponse = {};

  authResponse.principalId = principalId;
  if (effect && resource) {
    // if the effect and resource are true then pass the policy document
    let policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: effect,
          Resource: resource,
          Action: "execute-api:Invoke",
        },
      ],
    };
    authResponse.policyDocument = policyDocument;
  }

  authResponse.context = {
    foo: "bar",
  };
  console.log(JSON.stringify(authResponse));

  return authResponse;
};

exports.handler = async (event, context, callback) => {
  // lambda authorizer code

  const token = event.authorizationToken; // we have to pass the token in the authorizer header. we access it using the event.authorizationToken and assigning to the token variable
  console.log(token);
  try {
    const payload = await jwtVerifier.verify(token);
    console.log(JSON.stringify(payload));
    callback(null, generatePolicy("user", "Allow", event.methodArn)); // generate the policy and return to the API Gateway
  } catch (error) {
    console.error(error);
    callback("Error: Invalid token");
  }

  /*
  // passing strings in the place of actual tokens to verify users
  switch (token) {
    case "allow":
      callback(null, generatePolicy("user", "Allow", event.methodArn));
      break;
    case "deny":
      callback(null, generatePolicy("user", "Deny", event.methodArn));
    default:
      callback("Error: Invalid token");
  }
  */
};
