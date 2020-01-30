exports.seed = function(knex) {
  return knex("users").insert([
    {
      name: "tom",
      email: "tom@tom.com"
    },
    {
      name: "jake",
      email: "jake@tom.com"
    },
    {
      name: "richard",
      email: "rich@dollars.com"
    }
  ]);
};

// my branch
