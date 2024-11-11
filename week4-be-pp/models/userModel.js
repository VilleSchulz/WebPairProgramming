// data model

const { urlencoded } = require("express");

/*
{
  "name": "Matti Seppänen",
  "email": "matti@example.com",
  "password": "M@45mtg$",
  "phone_number": "+358401234567",
  "gender": "Male",
  "date_of_birth": "2000-01-15",
  "membership_status": "Active"
}
*/ let userArray = [];
nextId = 1;

const getAll = () => {
  return userArray;
};

const addOne = (
  name,
  email,
  password,
  phone_number,
  gender,
  date_of_birth,
  membership_status
) => {
  if (
    !name |
    !email |
    !password |
    !phone_number |
    !gender |
    !date_of_birth |
    !membership_status
  ) {
    return false;
  }

  const newUser = {
    id: nextId++,
    name,
    email,
    password,
    phone_number,
    gender,
    date_of_birth,
    membership_status,
  };

  userArray.push(newUser);
  return newUser;
};

const findById = (id) => {
  const user = userArray.find((user) => user.id === Number(id));
  if (user) {
    return user;
  } else {
    return false;
  }
};

const updateOneById = (id, updatedData) => {
  const user = findById(id);
  if (user) {
    if (updatedData.name) {
      user.name = updatedData.name;
    }
    if (updatedData.email) {
      user.email = updatedData.email;
    }

    if (updatedData.password) {
      user.password = updatedData.password;
    }
    if (updatedData.phone_number) {
      user.phone_number = updatedData.phone_number;
    }
    if (updatedData.gender) {
      user.gender = updatedData.gender;
    }
    if (updatedData.date_of_birth) {
      user.date_of_birth = updatedData.date_of_birth;
    }
    if (updatedData.membership_status) {
      user.membership_status = updatedData.membership_status;
    }
    return user;
  }
  return false;
};

const deleteOneById = (id) => {
  const user = findById(id);
  if (user) {
    const initialLenght = userArray.length;
    userArray = userArray.filter((user) => user.id !== Number(id));
    return tourArray.length < initialLenght;
  } else {
    return false;
  }
};

module.exports = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};
