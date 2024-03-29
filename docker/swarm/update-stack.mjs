#!/usr/bin/env zx
import { $, YAML } from "zx";
import { read } from "fsxx";
import "zx/globals";

let pkg = JSON.parse(await read("package.json"));
let serviceNames = Object.keys(
  YAML.parse(await read("swarm-stacks/remix-gun.yml"))
);

serviceNames.forEach(async (serviceName) => {
  await $`docker service update ${pkg.name.replace(
    ".",
    "-"
  )}_${serviceName} --image=bresnow/${pkg.name}:${pkg.version}`;
});
