import { $, chalk } from 'zx';
import 'zx/globals';
/**
 * Initialize Swarm
 */
try {
	//$.verbose = false
 // await $`docker swarm init`} catch (error) {
let advertAddr = await $`ip addr show eth0 | grep inet`
let  advertAddr1 = advertAddr.stdout.replace(/inet/g, '')
console.log(advertAddr1)//await $``
advertAddr1.stdout.split("/").map((line, i)=>{
if (!line.include('global'){return null}

	if (i ===0|| i % 2 === 0){
	let [lead,label] = line.stdout.slice('global')
		console.log(chalk.blue(lead))
		
	}
})
//await $``
//await $``
}
 catch (error) {
  console.log(chalk.red(error));
}
