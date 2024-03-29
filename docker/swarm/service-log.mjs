import { $ } from "zx";
import "zx/globals";
import { read } from "fsxx";
let cl = console.log;

let pkg = JSON.parse(await read("package.json"));
let { name, version } = pkg;
let services = await $`docker stack services ${name} --format "{{.Name}}"`;
services.stdout.split("\n").forEach(async (service) => {
  if (typeof service === "string" && service.length > 0) {
    await $`docker service logs ${service.trim()}`;
  }
});
