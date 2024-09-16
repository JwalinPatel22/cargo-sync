import { Parcel } from "../models/parcel_model.js";

//creating a new parcel
export const createParcel = async (req, res) => {
  try {
    const { description, quantity, weight, dimensions, destination } = req.body;

    if (!req.user || !["Individual", "Organization"].includes(req.user.role)) {
      return res.status(403).json({ error: "Access Denied" });
    }

    const newParcel = new Parcel({
      description,
      quantity,
      weight,
      dimensions,

      sender: req.user._id,
      senderModel: req.user.role,
      destination,
    });

    const savedParcel = newParcel.save();
    res.status(201).json({
      message: "Parcel Created Succesfully",
      parcel: savedParcel,
    });
  } catch (error) {
    res.status(400).json({ error: "Error creating parcel" }, error);
  }
};

export const getParcels = async (req, res) => {
  try {
    //extracting user id and role from jwt token
    const userId = req.user._id;
    const userRole = req.user.role;

    //fetching all of the parcels owned by an user
    const parcels = await Parcel.find({
      sender: userId,
      senderModel: userRole,
    });

    res.status(200).json({ parcels });
  } catch (error) {
    res.status(500).json({ error: "Error fetching parcels", error });
  }
};

export const getRecentParcels = async (req, res) => {
  try {
    // Extract user id and role from jwt token
    const userId = req.user.id;
    const userRole = req.user.role;

    // Fetching all the parcels owned by the user that are pending or on the way
    const parcels = await Parcel.find({
      sender: userId,
      senderModel: userRole,
      status: { $in: ["Pending", "On_the_way"] },
    }).sort({ createdAt: -1 }); // Sorting by most recent first

    // Returning the list of parcels
    res.status(200).json({ parcels });
  } catch (error) {
    // Handling any error during the fetch
    res.status(500).json({ error: "Error fetching parcels", details: error });
  }
};

export const getIndividualParcel = async (req, res) => {
  try {
    const { id } = req.params;
    const parcel = await Parcel.findById(id);

    if (!parcel) {
      return res.status(404).json({
        error: "Parcel not found",
      });
    }

    res.status(200).json({ parcel });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching parcel",
      error,
    });
  }
};
