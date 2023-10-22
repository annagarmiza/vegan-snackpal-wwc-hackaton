// @ts-check
const { z } = require("zod");
const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

//this file gives acces to all of the prisma can do but using over http (CLIENT SIDE)

/**
 * @typedef {import("@prisma/client").PrismaClient} Prisma
 */

/**
 * @type {{[Key in keyof Prisma as Key extends `$${string}` ? never : Key]: Key}}
 */
const models = {
  match: "match",
  preference: "preference",
  restriction: "restriction",
  user: "user",
  orderStatus: "orderStatus",
};

// with zod you can create validators called "schemas" each schema verifies the shape of some data

const request_body_schema = z.object({
  /* @ts-ignore */
  model: z.enum(Object.values(models)),
  operation: z.enum([
    "findMany",
    "findUnique",
    "findFirst",
    "findFirstOrThrow",
    "findUniqueOrThrow",
    "create",
    "upsert",
    "delete",
    "deleteMany",
    "updateMany",
  ]),
  data: z.object({}).passthrough(), //
});

export default async function (req, res) {
  const body = request_body_schema.safeParse(req.body);
  if (body.success) {
    const data = body.data;
    try {
      const result = await db[data.model][data.operation](data.data);
      return res.json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    /* @ts-ignore */
    return res.status(400).json(body.error);
  }
}
