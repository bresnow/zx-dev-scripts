#!/usr/bin/env zx
// yarn
await sleep(1000);

console.log("Installing yarn");
await $`npm install -g yarn`;
await $`yarn -v`;

await sleep(1000);

console.log("Installing git");
await $`sudo apt install git`;
await $`git --version`;
// await $`git config --global user.name "Your Name"`
// await $`git config --global user.email "

//net-tools
await sleep(1000);

console.log("Installing net tools");
await $`sudo apt install net-tools`;
await $`ifconfig`;

//openssh-server
await sleep(1000);

console.log("Installing openssh-server");
await $`sudo apt install openssh-server`;
await $`sudo systemctl enable ssh`;
await $`sudo systemctl start ssh`;
await $`sudo systemctl status ssh`;

//ufw
await sleep(1000);

console.log("Installing and configuring ufw");
await $`sudo apt install ufw`;
await $`sudo ufw allow 80/tcp`;
await $`sudo ufw allow 443/tcp`;
await $`sudo ufw allow 22/tcp`;
await $`sudo ufw enable`;
await $`sudo ufw status`;

// nginx
await sleep(1000);

console.log("Installing and configuring nginx");
await $`sudo apt install nginx`;
await $`sudo systemctl enable nginx`;
await $`sudo systemctl start nginx`;
await $`sudo service nginx status`;

// docker

await $`zx https://raw.githubusercontent.com/foyzulkarim/linux-playbook-javascript/main/docker.mjs`;
// docker-compose

await $`zx https://raw.githubusercontent.com/foyzulkarim/linux-playbook-javascript/main/docker-compose.mjs`;

let ip = await question("Advertise address: ");
await $`docker swarm init --advertise-addr ${ip}`;
