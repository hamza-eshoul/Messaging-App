const User = require("./models/userModel");
const { faker } = require("@faker-js/faker");

async function createRandomUser() {
  const fakeUser = new User({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    profileImg: {
      public_id: "",
      url: faker.image.avatar(),
    },
    coverImg: {
      public_id: "",
      url: faker.image.url(),
    },
    password: faker.internet.password(),
    profession: faker.person.jobType(),
    employer: faker.company.name(),
    location: faker.location.city() + " , " + faker.location.country(),
    aboutUser: faker.person.bio(),
    skills: ["Finance", "Corporate Finance", "Accounting"],
  });

  await fakeUser.save();
}

const createMultipleUsers = () => {
  return faker.helpers.multiple(createRandomUser, {
    count: 20,
  });
};

module.exports = createMultipleUsers;
