# .bashrc
# Aliases and Functions
alias ls="ls --color=auto"
alias ll="ls -l --color=auto"
alias less="less -X"
alias vimr="vim -R"
alias gtree="git log --all --decorate --max-count=20 --abbrev-commit --graph --pretty=format:\"%C(yellow)%h%Creset %C(cyan)%C(bold)%an%Creset %C(green)%cr%Creset %C(magenta)%d%Creset %C(white)%s\""

# git stuff
if tput setaf 1 &> /dev/null; then
  tput sgr0
  if [[ $(tput colors) -ge 256 ]] 2>/dev/null; then
    MAGENTA=$(tput setaf 9)
    ORANGE=$(tput setaf 172)
    GREEN=$(tput setaf 190)
    PURPLE=$(tput setaf 141)
    WHITE=$(tput setaf 0)
  else
    MAGENTA=$(tput setaf 5)
    ORANGE=$(tput setaf 4)
    GREEN=$(tput setaf 2)
    PURPLE=$(tput setaf 1)
    WHITE=$(tput setaf 7)
  fi
  BOLD=$(tput bold)
  RESET=$(tput sgr0)
else
  MAGENTA="\033[1;31m"
  ORANGE="\033[1;33m"
  GREEN="\033[1;32m"
  PURPLE="\033[1;35m"
  WHITE="\033[1;37m"
  BOLD=""
  RESET="\033[m"
fi
export MAGENTA
export ORANGE
export GREEN
export PURPLE
export WHITE
export BOLD
export RESET

function gstat {
  echo "Showing branch info:"
  git branch -a
  echo "Listing remotes:"
  git remote -v
}

function gsw {
  echo "switching to puppet-$1"
  cd "/home/bfain/git/puppet-$1"
  gtree
}

function gh {
  echo "switching to git home dir"
  cd "/home/bfain/git"
  echo "list of local repos:"
  ll | grep puppet
}

function is_on_git() {
  git rev-parse 2> /dev/null
}

function parse_git_dirty() {
  [[ $(git status 2> /dev/null | tail -n1) != *"working directory clean"* ]] && echo "±"
}

function parse_git_branch() {
  git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e "s/* \(.*\)/\1$(parse_git_dirty)/"
}

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

# User specific aliases and functions
export PS1="\[$ORANGE\][\[$GREEN\]\u\[$ORANGE\]@\[${BOLD}${MAGENTA}\]\h \[$GREEN\]\w\[$BOLD\]\$(is_on_git && [[ -n \$(git branch 2> /dev/null) ]] && echo \":\")\[$PURPLE\]\$(parse_git_branch)\[$BOLD\]\[$ORANGE\]]\[$RESET\]# "

# Proxy for a Virtualbox VM
export http_proxy=http://a909858:nssv8iu2@proxyv.dpn.deere.com:82/

