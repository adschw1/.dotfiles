#!/usr/bin/env sh

DOTFILES="$HOME/.dotfiles"
CURRENT_USER=$USER

# homebrew TODO: make these optional...
echo "\nsetting up homebrew...\n"
if [[ `brew --help` ]]; then
  echo "\nbrew already installed...\n"
  sudo -u $CURRENT_USER brew doctor
  sudo -u $CURRENT_USER brew cleanup
else
  echo "\ninstalling brew...\n"
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  sudo -u $CURRENT_USER brew update
fi

echo "\nchecking for git...\n"
if [[ `git --help` ]]; then
  echo "\ngit is installed...\n"
else
  echo "\ninstalling git...\n"
  sudo -u $CURRENT_USER brew install git
fi

echo "installing/updating dotfiles...\n"
if [ ! -e $DOTFILES/.git ]; then
    echo "cloning dotfiles\n"
    git clone https://github.com/adschw1/.dotfiles.git
else
    echo "updating dotfiles\n"
    cd $DOTFILES && git pull
fi

while true; do
    echo "\nwould you like to install the following tools?\n • tree\n • drone\n • terraform\n • chrome\n • firefox\n • lastpass\n • flowdock\n • sublime\n • intellij\n • vscode\n • keepass\n • docker \n • jdk8\n • maven\n • gradle"
    read -p "(y/n)" yn
    case $yn in
        [Yy]* )     
            echo "\ninstalling useful tools...\n"
            sudo -u $CURRENT_USER brew install tree
            sudo -u $CURRENT_USER brew tap drone/drone
            sudo -u $CURRENT_USER brew install drone
            sudo -u $CURRENT_USER brew install terraform
            sudo -u $CURRENT_USER brew cask install google-chrome
            sudo -u $CURRENT_USER brew cask install firefox
            sudo -u $CURRENT_USER brew cask install lastpass
            sudo -u $CURRENT_USER brew cask install flowdock
            sudo -u $CURRENT_USER brew cask install sublime-text
            sudo -u $CURRENT_USER brew cask install intellij-idea
            sudo -u $CURRENT_USER brew cask install visual-studio-code
            sudo -u $CURRENT_USER brew cask install keepassxc
            sudo -u $CURRENT_USER brew cask install docker
            sudo -u $CURRENT_USER brew tap AdoptOpenJDK/openjdk
            sudo -u $CURRENT_USER brew cask install adoptopenjdk8-jre
            sudo -u $CURRENT_USER brew install maven
            sudo -u $CURRENT_USER brew install gradle
            ;;
        [Nn]* ) break;;
        * ) echo "please answer yes or no.";;
    esac
done

# bash
echo "\nsetting up bash...\n"
sudo -u $CURRENT_USER ln -sfnv $DOTFILES/.bashrc $HOME/.bashrc
sudo -u $CURRENT_USER ln -sfnv $DOTFILES/.bash_profile $HOME/.bash_profile
sudo -u root ln -sfnv $DOTFILES/.bashrc /var/root/.bashrc
sudo -u root ln -sfnv $DOTFILES/.bash_profile /var/root/.bash_profile

# vim
echo "\nsetting up vim...\n"
sudo -u $CURRENT_USER ln -sfnv $DOTFILES/.vimrc $HOME/.vimrc
sudo -u $CURRENT_USER ln -sfnv $DOTFILES/.vim_runtime $HOME/.vim_runtime
sudo -u root ln -sfnv $DOTFILES/.vimrc /var/root/.vimrc
sudo -u root ln -sfnv $DOTFILES/.vim_runtime /var/root/.vim_runtime

# tmux
echo "\nsetting up tmux...\n"
sudo -u $CURRENT_USER brew install tmux
sudo -u $CURRENT_USER ln -sfnv $DOTFILES/.tmux.conf $HOME/.tmux.conf
sudo -u root ln -sfnv $DOTFILES/.tmux.conf /var/root/.tmux.conf

# zsh
echo "\nsetting up zsh...\n"
sudo -u $CURRENT_USER brew install zsh
sudo -u $CURRENT_USER brew install thefuck
sudo -u $CURRENT_USER chsh -s /bin/zsh
sudo -u root chsh -s /bin/zsh

# oh-my-zsh
echo "\nsetting up oh-my-zsh...\n"
sudo -u $CURRENT_USER sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
sudo -u $CURRENT_USER ln -sfnv $DOTFILES/.oh-my-zsh $HOME/.oh-my-zsh
sudo -u $CURRENT_USER ln -sfnv $DOTFILES/.zshrc $HOME/.zshrc
sudo -u root ln -sfnv $DOTFILES/.oh-my-zsh /var/root/.oh-my-zsh
sudo -u root ln -sfnv $DOTFILES/.zshrc /var/root/.zshrc

