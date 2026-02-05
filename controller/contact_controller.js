const ghlauth = require("../middleware/ghlAuth_middleware");
const Token = require("../model/token_model");
const Contact = require("../model/Contact_model");

exports.createContact = async (req, res) => {
  try {
    const accessToken = await ghlauth.getValidAccessToken();

    const acctoken = await Token.findOne();

    const contactdata = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address1,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      country: req.body.country,
      source: req.body.source,
      locationId: acctoken.locationID,
    };

    const response = await fetch(
      "https://services.leadconnectorhq.com/contacts/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(contactdata),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json(data);
    }

    await Contact.create({
      ghlId: data.contact.id,
      locationId: contactdata.locationId,
      firstName: contactdata.firstName,
      lastName: contactdata.lastName,
      email: contactdata.email,
      phone: contactdata.phone,
      address: contactdata.address,
      city: contactdata.city,
      state: contactdata.state,
      postalCode: contactdata.postalCode,
      country: contactdata.country,
      source: contactdata.source || "Postman/API",
    });

    console.log("Contact saved to DB");

    res.status(201).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
