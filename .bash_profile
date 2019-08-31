#Styles
# PS1="\t|\u|\W -> ";
# PS1="$ ";
PS1="\d, \@ $ "
alias bashconf="vim ~/.bashrc"
alias reload="source ~/.bashrc"
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

cdls() { cd "$@" && ls; }

shopt -s cdspell;

#Enable tab completion for 'g' by marking it as an alias for 'git'
if type _git &> /dev/null && [ -f /usr/local/etc/bash_completion.d/git-completion.bash ]; then
        complete -o default -o nospace -F _git g;
    fi;

if [ -f $HOME/.bashrc]; then
	. $HOME/.bashrc
fi
