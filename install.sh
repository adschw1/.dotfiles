#!/usr/bin/env sh

dotfiles="~/.dotfiles"

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

echo "Installing/Updating dotfiles...\n"

if [ ! -e $dotfiles/.git ]; then
    echo "Cloning dotfiles\n"
    # git clone ----repohere----
else
    echo "Updating dotfiles\n"
    cd $dotfiles && git pull
fi

# bash
# echo "Setting up bash...\n"

# vim
echo "Setting up vim...\n"
lnif $dotfiles/.vimrc ~/.vimrc
lnif $dotfiles/.vim_runtime ~/.vim_runtime

# tmux
echo "Setting up tmux...\n"
lnif $dotfiles/.tmux.conf ~/.tmux.conf

# zsh
# echo "Setting up zsh...\n"

