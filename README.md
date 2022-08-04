# System Administration Playbook

## Why
Automated and consistent VM management for unmanaged virtual servers.  In constant development. Playbooks are primarily geared for new VM setup, Git, and Docker automation. 


## How
Google Zx Javascript modules automate the installation of software and other tedious / repetitive tasks .

## Steps for new VM 
Execute the following commands in terminal:
```sh
> wget https://github.com/bresnow/zx-dev-scripts.git/init/setup.sh
> chmod 755 setup.sh
> ./setup.sh
```

## Deploy Traefik v2.8 w/ Traefik Hub for Docker Swarm

```
yarn prep:traefik



```


After running the `setup.sh` file, it will guide you through the installation process.

## Goals
- Alpine linux scripts for Docker images
