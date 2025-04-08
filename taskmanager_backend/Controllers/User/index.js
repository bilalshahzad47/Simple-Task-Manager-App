const User = require("../../Models/User/User");
const Userprofile = require("../../Models/User/Userprofile");
const Task = require("../../Models/Task/Task");
const { ApiResponse, generateToken } = require("../../Helpers/index");
const bcrypt = require("bcrypt");

// User Signup Controller
exports.signup = async (req, res) => {
  const { email, password, firstName, lastName, mobile } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json(ApiResponse({}, "A User with this Email Already Exists", false));
    }
    user = new User({
      email,
      password,
      firstName,
      lastName,
      mobile,
    });
    const token = generateToken(user);

    await user.save();
    res
      .status(200)
      .json(
        ApiResponse(
          { user, token },
          "Your Account has been created Successfully",
          true
        )
      );
  } catch (error) {
    console.log(error);
    return res.status(500).json(ApiResponse({}, error.message, false));
  }
};

// Login Controller for User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json(ApiResponse({}, "No User Found With this Email", false));
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res
        .status(401)
        .json(ApiResponse({}, "Invalid Credentials", false));
    }
    const token = generateToken(user);

    res
      .status(200)
      .send(ApiResponse({ token, user }, "Logged In Successfully", true));
  } catch (error) {
    console.log(error);
    return res.status(500).json(ApiResponse({}, error.message, false));
  }
};

// Dashbaord Info Controller
exports.dashboardInfo = async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments();
    // console.log(totalCustomers, "totalcustomers")
    const completedTasks = await Task.countDocuments({ status: "DONE" });
    const todoTasks = await Task.countDocuments({ status: "TODO" });
    const pendingTasks = await Task.countDocuments({ status: "INPROGRESS" });
    res.status(200).json(
      ApiResponse(
        {
          totalCustomers,
          completedTasks,
          todoTasks,
          pendingTasks,
        },
        "Success",
        true
      )
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(ApiResponse({}, error.message, false));
  }
};

// Get All Users Controller
exports.getUsers = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const { keyword, from, to } = req.query;

  let finalAggregate = [];
  finalAggregate.push({
    $sort: {
      createdAt: -1,
    },
  });

  if (from && to) {
    const utcFrom = moment.utc(from, "YYYY-MM-DD").startOf("day").toDate();
    const utcTo = moment.utc(to, "YYYY-MM-DD").endOf("day").toDate();
    finalAggregate.push({
      $match: {
        date: {
          $gte: utcFrom,
          $lte: utcTo,
        },
      },
    });
  }

  if (keyword) {
    const regex = new RegExp(keyword.toLowerCase(), "i");
    finalAggregate.push({
      $match: {
        $or: [
          { firstName: { $regex: regex } },
          { lastName: { $regex: regex } },
        ],
      },
    });
  }
  const myAggregate =
    finalAggregate.length > 0
      ? User.aggregate(finalAggregate)
      : User.aggregate([]);
  User.aggregatePaginate(myAggregate, { page, limit })
    .then((users) => {
      res
        .status(200)
        .json(ApiResponse(users, `${users.docs.length} users found`, true));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(ApiResponse({}, err.message, false));
    });
};

// Create My Profile Controller
exports.createProfile = async (req, res) => {
  const { email, fullName, image, location, dateOfBirth, gender, phone } =
    req.body;
  try {
    const profile = new Userprofile({
      email,
      fullName,
      image,
      location: JSON.parse(location),
      dateOfBirth,
      gender,
      phone,
      user: req.user._id,
    });
    await profile.save();
    res
      .status(200)
      .json(ApiResponse(profile, "Profile Created Successfully", true));
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors);
      const errorMessages = validationErrors.map((err) => err.message);

      const missingFields = errorMessages.filter((msg) =>
        msg.includes("is Required")
      );

      if (missingFields.length > 0) {
        return res
          .status(400)
          .json(ApiResponse({}, missingFields.join(", "), false));
      }
    }

    console.log(error);
    return res.status(500).json(ApiResponse({}, error.message, false));
  }
};

// Get My Profile Controller
exports.getMyProfile = async (req, res) => {
  let profile = await Userprofile.findOne({ user: req.user._id });
  try {
    if (!profile) {
      return res.json(ApiResponse({}, "Profile Not Found", false));
    }
    res.status(200).json(ApiResponse(profile, "Profile", true));
  } catch (error) {
    console.log(error);
    res.status(500).json(ApiResponse({}, error.message, false));
  }
};
