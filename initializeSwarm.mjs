import { $, question, chalk } from "zx";
import "zx/globals";
/**
 * Initialize Swarm
 */
const InitializeSwarm = async () => {
  try {
    $.verbose = false;
    // await $`docker swarm init`} catch (error) {
    let ipGrep = await $`ip addr show eth0 | grep inet`;
    let rawStr = ipGrep.stdout.trim().split(/\/n/g);
    let advAdd = [];

    for (let i = 0; i < rawStr.length; i++) {
      let line = rawStr[i];
      let str = line.split(/inet/g);
      for (let j = 0; j < str.length; j++) {
        if (!str[j].startsWith(" 6")) {
          let label = str[j].split(/global/g)[1];
          rawStr = str[j].split("/")[0];
          if (label !== undefined) {
            label = label.slice("\n").trim();
            let ip = rawStr.trim();
            console.log();
            advAdd.push({ label, ip });
          }
        }
      }
    }

    let lists = advAdd.map(({ ip, label }, index) => {
      console.log(
        chalk.blueBright(
          [
            `Type "${chalk.yellowBright.bold(
              label
            )}" OR "${chalk.yellowBright.bold(index)}" to use `,
          ] + chalk.green.italic.bold(ip)
        ) + "\n"
      );
      return `${index},${label},${ip}`;
    });

    if (lists.length === 1) {
      let [_index, _label, ip] = lists[0].split(/,/g);
      console.log(
        chalk.blueBright(
          `Only one ip -- Using default advertising address ` +
            chalk.green.italic.bold(ip)
        )
      );
      await $`docker swarm init --advertise-addr ${ip}`;
      process.exit(0);
    }
    let answer = await question(
      chalk.underline.italic.bold(`Choose advertising address\n\n`)
    );
    for (let k = 0; k < lists.length; k++) {
      let [index, label, ip] = lists[k].split(/,/g);
      if (answer.trim() === (label || index)) {
        await $`docker swarm init --advertise-addr ${ip}`;
        process.exit(0);
      } else {
        ip = lists[0][2];
        console.log(
          chalk.yellow(
            `Invalid option ... Using default address ` +
              chalk.green.italic.bold(ip)
          )
        );
        await $`docker swarm init --advertise-addr ${ip}`;
        process.exit(0);
      }
    }
  } catch (error) {
    $.verbose = true;
    console.log(chalk.red(error));
    process.exit(1);
  }
};

await InitializeSwarm();
