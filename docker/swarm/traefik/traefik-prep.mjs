#!/usr/bin/env zx
import { $, chalk } from "zx";
import "zx/globals";
/**
 * Creates the external network and labels needed for the swarm stack deployment.
 */

try {
  await $`docker network create --driver=overlay traefik-public`;
} catch (error) {
  console.log(chalk.red(error));
}
try {
  await $`export NODE_ID=$(docker info -f '{{.Swarm.NodeID}}')`;
  await $`docker node update --label-add traefik-public.traefik-pu\blic-certificates=true $NODE_ID`;
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
