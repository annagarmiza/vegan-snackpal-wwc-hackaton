import { PrismaClient } from "@prisma/client";
const { z } = require("zod");
const prisma = new PrismaClient();

export default async function (req, res) {
  const request_body_schema = z.object({
    current_user_id: z.string().min(1),
  });

  const parsedBody = request_body_schema.safeParse(req.body);
  if (parsedBody.success) {
    const data = parsedBody.data;
    try {
      const result = await generateMatch(data.current_user_id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: parsedBody.error });
  }
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
    throw new Error(" You are already part of an active match");
  }
  // TO DO : filter users ready to exhanges by country not being the same as the current_user_id country

  const current_user = await prisma.user.findUnique({
    where: {
      id: current_user_id,
    },
    select: { country: true },
  });

  console.log(current_user);
  const users_ready_to_exchange = await prisma.user.findMany({
    where: {
      ready_to_exchange: true,
      id: {
        notIn: [...user_ids_that_should_not_be_matched, current_user_id],
      },
    },
  });

  if (users_ready_to_exchange.length === 0) {
    throw new Error("There are no users ready to exchange retry later");
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
    include: {
      user_1: true,
      user_2: true,
    },
  });

  return newMatch;
}
