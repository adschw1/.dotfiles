alias zshconf="vim ~/.zshrc"
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
alias fk="fuck"
alias shit="fuck"
alias oops="fuck"

export ZSH="~/.oh-my-zsh"
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
