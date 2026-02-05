const Token = require("../model/token_model");

exports.getAuthorizationUrl = () => {
  return (
    `${process.env.AUTH_URL}` +
    `?response_type=code` +
    `&client_id=${process.env.CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}` +
    `&scope=${encodeURIComponent("contacts.readonly contacts.write")}` +
    `&version_id=${process.env.VERSION_ID}`
  );
};

exports.handlecode = async (req, res) => {
  const link = await exports.getAuthorizationUrl();
  return res.redirect(link);
};

exports.gettoken = async (code) => {
  const response = await fetch(process.env.TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.REDIRECT_URI,
    }).toString(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }
  return data;
};

exports.handletoken = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("Authorization code missing");
  }

  const response = await exports.gettoken(code);

  const expiresAt = new Date(Date.now() + response.expires_in * 1000);

  const savetoken = await Token.findOneAndUpdate(
    {},
    {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      locationID: response.locationId,
      expires_at: expiresAt,
    },
    {
      new: true, //janooo    it returns the updated token
      upsert: true, // it is used to upate or create a new token
    }
  );
  res.status(200).json({
    message: "Token saved successfully",
    token: savetoken,
  });
};

exports.refreshAccessToken = async (refreshToken) => {
  const response = await fetch(process.env.TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Token refresh failed: ${JSON.stringify(data)}`);
  }

  return data;
};
