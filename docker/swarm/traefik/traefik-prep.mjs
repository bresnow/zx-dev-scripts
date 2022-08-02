#!/usr/bin/env zx
/**
 * Creates the external network and labels needed for the swarm stack deployment.
 */

try {
  await $`docker network create --driver=overlay traefik-public`;
} catch (error) {
  console.log(chalk.red(error));
}
try {
  let nodeID =
    await $`docker node inspect --format="{{.ID}}" $(docker node ls -q)`;
  await $`docker node update --label-add traefik-public.traefik-public-certificates=true ${nodeID.stdout.trim()}`;
} catch (error) {
  console.log(chalk.red(error));
}

try {
  console.log(chalk.green("TRAEFIK BASICAUTH MIDDLEWARE"));
  let username = await question(`USERNAME- `);
  let password = await question(`PASSWORD- `);
  let email = await question(`EMAIL- `);
  let domain = await question(`DOMAIN- `);
  if (username && password) {
    username = username.trim();
    password = password.trim();
    let hashed = await $`openssl passwd -apr1 "${password}"`;
    await $`export USERNAME=${username}`;
    await $`export HASHED_PASSWORD=${hashed}`;
    await $`export EMAIL=${email}`;
    await $`export DOMAIN=${domain}`;
    await $`docker stack deploy -c ${__dirname}/../traefik.yml traefik`;
  }
} catch (error) {
  console.log(chalk.red(error));
}
