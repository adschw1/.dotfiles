alias zshconf="vim ~/.zshrc"
alias python=/usr/local/bin/python3.7
alias reload="source ~/.zshrc"
alias ll="ls -lhaG"
alias l="ls -lhsG"
alias please="sudo"
alias ls="ls -G"
alias py="python"
alias py3="python3"
alias tel="telnet"
alias nuke="sudo rm -rf"
alias du="du -s -h"
alias df="df -H"
alias vimr="vim -R"
alias graph="git log --all --decorate --max-count=20 --abbrev-commit --graph --pretty=format:\"%C(yellow)%h%Creset %C(cyan)%C(bold)%an%Creset %C(green)%cr%Creset %C(magenta)%d%Creset %C(white)%s\""

export ZSH="$HOME/.oh-my-zsh"
export UPDATE_ZSH_DAYS=7
export MANPATH="/usr/local/man:$MANPATH"
export LANG=en_US.UTF-8
export ARCHFLAGS="-arch x86_64"
export SSH_KEY_PATH="~/.ssh/rsa_id"

# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

PS1="\d, \@ $ "

ZSH_THEME="avit"
# ZSH_THEME="random"
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "avit" )

# CASE_SENSITIVE="true"
HYPHEN_INSENSITIVE="true"
ENABLE_CORRECTION="true"
COMPLETION_WAITING_DOTS="true"
DISABLE_UNTRACKED_FILES_DIRTY="true"
# HIST_STAMPS="mm/dd/yyyy"
# ZSH_CUSTOM=/path/to/new-custom-folder
plugins=(git thefuck vscode colorize)

source $ZSH/oh-my-zsh.sh
