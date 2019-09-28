#!/usr/bin/env sh

dotfiles="$home/.dotfiles"
current_user=$user

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

echo "installing/updating dotfiles...\n"

if [ ! -e $dotfiles/.git ]; then
    echo "cloning dotfiles\n"
    git clone https://github.com/adschw1/.dotfiles.git
else
    echo "updating dotfiles\n"
    cd $dotfiles && git pull
fi

# bash
echo "setting up bash...\n"
sudo -u $CURRENT_USER "lnif $dotfiles/.bashrc $home/.bashrc"
sudo -u $CURRENT_USER "lnif $DOTFILES/.bash_profile $HOME/.bash_profile"
sudo ln -s $DOTFILES/.bashrc /var/root/.bashrc
sudo ln -s $DOTFILES/.bash_profile /var/root/.bash_profile


# vim
echo "Setting up vim...\n"
sudo -u $CURRENT_USER "lnif $DOTFILES/.vimrc $HOME/.vimrc"
sudo -u $CURRENT_USER "lnif $DOTFILES/.vim_runtime $HOME/.vim_runtime"
sudo ln -s $DOTFILES/.vimrc /var/root/.vimrc
sudo ln -s $DOTFILES/.vim_runtime /var/root/.vim_runtime

# tmux
echo "Setting up tmux...\n"
sudo -u $CURRENT_USER "brew install tmux"
lnif $DOTFILES/.tmux.conf $HOME/.tmux.conf
sudo ln -s $DOTFILES/.tmux.conf /var/root/.tmux.conf

# zsh
echo "Setting up zsh...\n"
sudo -u $CURRENT_USER "brew install zsh"

# oh-my-zsh
echo "Setting up oh-my-zsh"
sudo -u $CURRENT_USER "sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)""
chsh -s /bin/zsh
sudo chsh -s /bin/zsh
sudo -u $CURRENT_USER "lnif $DOTFILES/.oh-my-zsh $HOME/.oh-my-zsh"
sudo -u $CURRENT_USER "lnif $DOTFILES/.zshrc $HOME/.zshrc"
sudo ln -s $DOTFILES/.oh-my-zsh /var/root/.oh-my-zsh
sudo ln -s $DOTFILES/.zshrc /var/root/.zshrc

