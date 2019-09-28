#!/usr/bin/env sh

DOTFILES="$HOME/.dotfiles"
CURRENT_USER=$USER

# to error out
warn() {
    echo "$1" >&2
}
die() {
    warn "$1"
    exit 1
}

lnif() {
    if [ ! -e $2 ] ; then
        ln -s $1 $2
    fi
}

echo "Installing/Updating DOTFILES...\n"

if [ ! -e $DOTFILES/.git ]; then
    echo "Cloning DOTFILES\n"
    # git clone ----repohere----
else
    echo "Updating DOTFILES\n"
    cd $DOTFILES && git pull
fi

# bash
# echo "Setting up bash...\n"

# vim
echo "Setting up vim...\n"
lnif $DOTFILES/.vimrc $HOME/.vimrc
lnif $DOTFILES/.vim_runtime $HOME/.vim_runtime
sudo ln -s $HOME/.vimrc /var/root/.vimrc
sudo ln -s $HOME/.vim_runtime /var/root/.vim_runtime

# tmux
echo "Setting up tmux...\n"
lnif $DOTFILES/.tmux.conf $HOME/.tmux.conf

# zsh
echo "Setting up zsh...\n"
sudo -u $CURRENT_USER brew install zsh

# oh-my-zsh
echo "Setting up oh-my-zsh"
chsh -s /bin/zsh
sudo chsh -s /bin/zsh
lnif $DOTFILES/.oh-my-zsh $HOME/.oh-my-zsh
lnif $DOTFILES/.zshrc $HOME/.zshrc
sudo ln -s $HOME/.oh-my-zsh /var/root/.oh-my-zsh
sudo ln -s $HOME/.zshrc /var/root/.zshrc
