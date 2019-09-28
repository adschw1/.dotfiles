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

# lnif() {
#     if [ ! -e $2 ] ; then
#         ln -sfnv $1 $2
#     fi
# }

echo "installing/updating dotfiles...\n"

if [ ! -e $DOTFILES/.git ]; then
    echo "cloning dotfiles\n"
    git clone https://github.com/adschw1/.dotfiles.git
else
    echo "updating dotfiles\n"
    cd $DOTFILES && git pull
fi

# bash
echo "setting up bash...\n"
sudo -u $CURRENT_USER ln -sfnv $DOTFILES/.bashrc $HOME/.bashrc
sudo -u $CURRENT_USER ln -sfnv $DOTFILES/.bash_profile $HOME/.bash_profile
sudo -u root ln -sfnv $DOTFILES/.bashrc /var/root/.bashrc
sudo -u root ln -sfnv $DOTFILES/.bash_profile /var/root/.bash_profile


# vim
echo "Setting up vim...\n"
sudo -u $CURRENT_USER ln -sfnv $DOTFILES/.vimrc $HOME/.vimrc
sudo -u $CURRENT_USER ln -sfnv $DOTFILES/.vim_runtime $HOME/.vim_runtime
sudo -u root ln -sfnv $DOTFILES/.vimrc /var/root/.vimrc
sudo -u root ln -sfnv $DOTFILES/.vim_runtime /var/root/.vim_runtime

# tmux
echo "Setting up tmux...\n"
sudo -u $CURRENT_USER brew install tmux
sudo -u $CURRENT_USER ln -sfnv $DOTFILES/.tmux.conf $HOME/.tmux.conf
sudo -u root ln -sfnv $DOTFILES/.tmux.conf /var/root/.tmux.conf

# zsh
echo "Setting up zsh...\n"
sudo -u $CURRENT_USER brew install zsh

# oh-my-zsh
echo "Setting up oh-my-zsh"
sudo -u $CURRENT_USER sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
sudo -u $CURRENT_USER chsh -s /bin/zsh
sudo -u root chsh /bin/zsh
sudo -u $CURRENT_USER ln -sfnv $DOTFILES/.oh-my-zsh $HOME/.oh-my-zsh
sudo -u $CURRENT_USER ln -sfnv $DOTFILES/.zshrc $HOME/.zshrc
sudo -u root ln -sfnv $DOTFILES/.oh-my-zsh /var/root/.oh-my-zsh
sudo -u root ln -sfnv $DOTFILES/.zshrc /var/root/.zshrc

