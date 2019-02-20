#Styles
# PS1="\t|\u|\W -> ";
# PS1="$ ";
PS1="\d, \@ $ "
alias ll="ls -lhaG"
alias please="sudo"
alias ls="ls -G"
alias py="python"
alias py3="python3"
alias tel="telnet"
alias nuke="sudo rm -rf"
alias gogogadget="conda activate py27"
alias nogogadget="conda deactivate"
alias showgogadget="conda info --envs"
alias webarya="py ~/pythonaci/webarya/webarya/webarya.py"
alias du="du -s -h"
alias df="df -H"
cdls() { cd "$@" && ls; }
# Setting PATH for Python 3.6 and Anaconda 2.7.14
# The original version is saved in .bash_profile.pysave
PATH="/Library/Frameworks/Python.framework/Versions/3.6/bin:${PATH}"
export PATH
export PATH="/usr/local/bin:$PATH"
# export PATH="/anaconda2/bin:$PATH"  # commented out by conda initialize

#Autocorrect typos in path names when using 'cd'
shopt -s cdspell;

#Enable tab completion for 'g' by marking it as an alias for 'git'
if type _git &> /dev/null && [ -f /usr/local/etc/bash_completion.d/git-completion.bash ]; then
        complete -o default -o nospace -F _git g;
    fi;

# Setting PATH for Python 3.7
# The original version is saved in .bash_profile.pysave
PATH="/Library/Frameworks/Python.framework/Versions/3.7/bin:${PATH}"
export PATH

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/anaconda2/bin/conda' 'shell.bash' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/anaconda2/etc/profile.d/conda.sh" ]; then
        . "/anaconda2/etc/profile.d/conda.sh"
    else
        export PATH="/anaconda2/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

