#!/bin/bash
echo "Setting up curl zsh nvm!"
sudo apt install curl zsh 
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
echo "export NVM_DIR="$HOME/.nvm" >> ~/.zshrc
echo "[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"" >> ~/.zshrc
echo "[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"" >> ~/.zshrc
zsh
nvm install node
npm i -g npm@latest
npm install -g zx
source ~/.bashrc
npx zx -v
npx zx ./index.mjs
