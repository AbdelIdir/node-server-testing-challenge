const db = require("../data/db_config");

async function find(query = {}) {
  const { limit = 10, sortby = "id", sortdir = "asc" } = query;

  let rows = await db("users")
    .orderBy(sortby, sortdir)
    .limit(limit);
  return rows;
}

async function findRoles(query = {}) {
  const { limit = 10, sortby = "id", sortdir = "asc" } = query;

  let rows = await db("roles")
    .orderBy(sortby, sortdir)
    .limit(limit);
  return rows;
}

function findUsersById(userId) {
  return db("users")
    .where({ userId })
    .first();
}

function addUser(user) {
  return db("users")
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

function addRoles(role) {
  return db("roles")
    .insert(role)
    .then(ids => ({ id: ids[0] }));
}

// this function here is to find a user by username and return the details for that user, so that on /login we can check if that password typed in the request body and the one that is in the database for that user match.

function findByLog(filter_Username) {
  return db("users")
    .select("id", "user_name", "password")
    .where(filter_Username)
    .first();
}

module.exports = {
  find,
  findUsersById,
  addUser,
  findRoles,
  addRoles,
  findByLog
};
