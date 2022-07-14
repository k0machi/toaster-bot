#!/usr/bin/env bash

function info {
  echo " "
  echo "--> $1"
  echo " "
}

#== Import script args ==

timezone=$(echo "$1")

#== Provision script ==

info "Provision-script user: `whoami`"

export DEBIAN_FRONTEND=noninteractive

info "Configure timezone"
timedatectl set-timezone ${timezone} --no-ask-password

info "Updating OS software"
apt-get update -y
apt-get upgrade -y
