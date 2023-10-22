// @ts-check
const fetch = require("@remix-run/web-fetch");
/**
 * @typedef {import("@prisma/client").Prisma} PrismaTypes
 * @typedef {import("@prisma/client").PrismaClient} Prisma
 * @typedef {{ [Key in keyof Prisma as Key extends `$${string}` ? never : Key]: Key}} Model
 */

// function post is doing an http request
function post(url, body) {
  return fetch(url, {
    headers: {
      "content-type": "application/json",
    },
    method: "post",
    body: JSON.stringify(body),
  }).then((response) => {
    return response.json();
  });
}
// fetched data from db(prisma) in the client
/**
 * @template {Exclude<keyof Prisma, `$${string}`>} T
 * @template {keyof Prisma[T]} Operation
 *
 * @param {T} model
 * @param {Operation} operation
 * @param {Parameters<Prisma[T][Operation]>[0]} data
 */
export default function vegan_SnackPal_Api(model, operation, data) {
  return post("/api/db", { data, model, operation });
}

/**
 * Generates a new match
 */
export function generateMatch(current_user_id) {
  return post("/api/generateMatch", { current_user_id });
}

/**
 *  Fetch the users currently active match or `null` if no match exists
 *  @param {string} current_user_id
 *  @param {import("@prisma/client").Prisma.MatchInclude} [include]
 */
export function get_active_match(current_user_id, include) {
  return vegan_SnackPal_Api("match", "findFirst", {
    where: {
      completed: false,
      OR: [
        {
          user_id_1: current_user_id,
        },
        {
          user_id_2: current_user_id,
        },
      ],
    },
    include: {
      ...include,
      user_1: true,
      user_2: true,
    },
  });
}
/**
 * Fetch the users history of matches
 */

export function get_match_history_for_current_user(current_user_id) {
  return vegan_SnackPal_Api("match", "findMany", {
    where: {
      AND: [
        {
          OR: [{ completed: false }, { completed: true }],
        },
        {
          OR: [
            {
              user_id_1: current_user_id,
            },
            {
              user_id_2: current_user_id,
            },
          ],
        },
      ],
    },
    include: {
      user_1: true,
      user_2: true,
    },
  });
}

/**
 *  Create new user in supabase after registring in Passage
 * @param {import("@prisma/client").Prisma.UserCreateInput} user
 */

export function create_user(user) {
  return vegan_SnackPal_Api("user", "create", { data: user });
}

/**
 * Fetch the current user
 */
export function get_user(current_user_id) {
  return vegan_SnackPal_Api("user", "findUnique", {
    where: { id: current_user_id },
  });
}

export function get_user_passage_id(userID) {
  return vegan_SnackPal_Api("user", "findUnique", {
    where: { user_id_passage: userID },
  });
}
/**
 *  Fetche all the prefrences of a user
 */
export function get_user_preferences(user_id) {
  return vegan_SnackPal_Api("preference", "findMany", {
    where: { user_id: user_id },
  });
}

/**
 *
 * @param {import("@prisma/client").Prisma.PreferenceCreateInput } preference
 *  Add a new prefrence for the user
 */
export function add_user_preference(preference) {
  return vegan_SnackPal_Api("preference", "create", { data: preference });
}

/**
 * Fetch all the restrictions of a user
 */
export function get_user_restrictions(user_id) {
  return vegan_SnackPal_Api("restriction", "findMany", {
    where: { user_id: user_id },
  });
}

/**
 * @param {import ("@prisma/client").Prisma.RestrictionCreateInput} restriction
 * Add a new preference for a user
 */
export function add_user_restriction(restriction) {
  return vegan_SnackPal_Api("restriction", "create", { data: restriction });
}

// export function update_user_package_status(user_status_id, status) {
//   return vegan_SnackPal_Api("match", "update", {
//     data: { user_id_1_status: status },
//   });
// }
