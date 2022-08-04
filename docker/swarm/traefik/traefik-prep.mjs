import { $, question, chalk, argv, path } from "zx";
import fs from "fs";
let log = console.log.bind(console);
try {
  let chxprt =
    argv["check-export"] !== undefined || argv["check-export"] === "true";
  // $.shell = '/usr/bin/zsh'
  let network = await $`sudo docker network ls --format {{.Name}}`;
  network = network.stdout.toString();
  network = network.split("\n").flatMap((x) => x.trim());
  let hasnetwk = false;
  for (let i = 0; i < network.length; i++) {
    if (network[i] === "traefik-public") {
      log(chalk.green.italic("*** Traefik Overlay Network Exists ***"));
      hasnetwk = true;
    }
  }
  if (!hasnetwk) {
    log(chalk.green.italic("*** Creating Traefik Overlay Network ***"));
    await $`docker network create --driver=overlay traefik-public`;
    let nodeID =
      await $`docker node inspect --format="{{.ID}}" $(docker node ls -q)`;
    nodeID = nodeID.stdout.toString().trim();
    await $`docker node update --label-add traefik-public.traefik-public-certificates=true ${nodeID}`;
  }

  // await $`docker stack deploy -c ${path.join(__dirname, '..', 'stack-templates', 'traefik.yml')}`
} catch (error) {
  throw new Error(chalk.red(error));
}
