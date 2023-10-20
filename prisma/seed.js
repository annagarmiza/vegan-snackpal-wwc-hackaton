// @ts-check
const { Prisma, PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

// async function cleanupData() {
//   await prisma.preference.deleteMany();
//   await prisma.restriction.deleteMany();
//   await prisma.match.deleteMany();
//   await prisma.user.deleteMany();
// }

async function main() {
  // await cleanupData();
  async function create_user() {
    const newUser = await prisma.user.create({
      data: {
        id: uuidv4(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        country: faker.location.country(),
        ready_to_exchange: faker.datatype.boolean(),
        address: faker.location.streetAddress(),
        recieved_packages: faker.number.int(23),
        user_id_passage: faker.string.uuid(),
        sent_packages: faker.number.int(23),
        image_url: faker.image.avatar(),
      },
    });
    return newUser;
  }

  // for (let i = 0; i < 5; i++) {
  //   await create_user();
  // }

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

  async function generateMatch(current_user_id) {
    // Get all users ready to exchange
    const user_ids_that_should_not_be_matched = await prisma.match
      .findMany({
        take: 100000,
        where: {
          completed: false,
        },
        select: {
          user_id_1: true,
          user_id_2: true,
        },
      })
      .then((results) => {
        return results
          .map(({ user_id_2, user_id_1 }) => [user_id_1, user_id_2])
          .flat()
          .filter((id, index, array) => {
            // This function makes sure that the same id is only included
            // once in the final array of ids
            return array.indexOf(id) === index;
          });
      });

    if (user_ids_that_should_not_be_matched.includes(current_user_id)) {
      throw new Error(" This user is already part of an active match");
    }

    const users_ready_to_exchange = await prisma.user.findMany({
      where: {
        ready_to_exchange: true,
        id: {
          notIn: [...user_ids_that_should_not_be_matched, current_user_id],
        },
      },
    });
    if (users_ready_to_exchange.length === 0) {
      console.log("there are not users ready to exchange retry later");
    }
    let randomUser =
      users_ready_to_exchange[
        Math.floor(Math.random() * users_ready_to_exchange.length)
      ];

    let newMatch = prisma.match.create({
      data: {
        user_id_1: current_user_id,
        user_id_2: randomUser.id,
        completed: false,
        user_id_1_status: "Packing 📦 ",
        user_id_2_status: "Packing 📦 ",
      },
    });
    return newMatch;
  }

  // await Promise.all([
  //   generatePreference(),
  //   generatePreference(),
  //   generatePreference(),
  //   generatePreference(),
  //   generatePreference(),
  //   generatePreference(),
  //   generatePreference(),
  //   generatePreference(),
  //   generatePreference(),
  //   generatePreference(),
  //   generatePreference(),
  //   generatePreference(),
  // ]);
  // await Promise.all([
  //   generateRestriction(),
  //   generateRestriction(),
  //   generateRestriction(),
  //   generateRestriction(),
  //   generateRestriction(),
  //   generateRestriction(),
  //   generateRestriction(),
  //   generateRestriction(),
  //   generateRestriction(),
  //   generateRestriction(),
  //   generateRestriction(),
  //   generateRestriction(),
  // ]);

  await Promise.all([
    generateMatch("e3a600f2-c95c-49cf-bf97-dbad2430eb73"),
    generateMatch("573c4d61-704f-4eb9-bba9-bf06dd6cbe55"),
  ]);
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
