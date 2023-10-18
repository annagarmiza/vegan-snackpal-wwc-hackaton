const { Prisma, PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function cleanupData() {
  await prisma.preference.deleteMany();
  await prisma.restriction.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  await cleanupData();
  async function create_user() {
    const newUser = await prisma.user.create({
      data: {
        id: uuidv4(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        country: faker.location.country(),
        ready_for_exachange: faker.datatype.boolean(),
        address: faker.location.streetAddress(),
        recieved_packages: faker.number.int(23),
        user_id_passage: faker.string.uuid(),
        sent_packages: faker.number.int(23),
        image_url: faker.image.avatar(),
      },
    });
    return newUser;
  }

  for (let i = 0; i < 5; i++) {
    await create_user();
  }

  async function generateRestriction() {
    const users = await prisma.user.findMany();
    const users_restriction_index = Math.floor(Math.random() * users.length);
    const restrictions = [
      "Gluten Intolerance",
      "Kosher",
      "Nut Allergy",
      "Peanut Allergy",
      "Lactose Intolerant",
    ];
    const restriciton_index = Math.floor(Math.random() * restrictions.length);
    return prisma.restriction.create({
      data: {
        id: faker.datatype.int,
        name: restrictions[restriciton_index],
        user_id: users[users_restriction_index].id,
      },
    });
  }

  async function generatePreference() {
    const users = await prisma.user.findMany();
    const users_preference_index = Math.floor(Math.random() * users.length);

    return prisma.preference.create({
      data: {
        id: faker.datatype.int,
        name: faker.lorem.word(),
        user_id: users[users_preference_index].id,
      },
    });
  }

  await Promise.all([
    generatePreference(),
    generatePreference(),
    generatePreference(),
    generatePreference(),
    generatePreference(),
    generatePreference(),
    generatePreference(),
    generatePreference(),
    generatePreference(),
    generatePreference(),
    generatePreference(),
    generatePreference(),
  ]);
  await Promise.all([
    generateRestriction(),
    generateRestriction(),
    generateRestriction(),
    generateRestriction(),
    generateRestriction(),
    generateRestriction(),
    generateRestriction(),
    generateRestriction(),
    generateRestriction(),
    generateRestriction(),
    generateRestriction(),
    generateRestriction(),
  ]);
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
