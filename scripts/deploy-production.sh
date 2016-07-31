#!/bin/sh

set -ex

export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
export AWS_DEFAULT_REGION="us-west-1"
MY_SECURITY_GROUP=${AWS_SECURITY_GROUP_ID}

MY_IP=`curl -s ifconfig.me`

aws ec2 authorize-security-group-ingress --group-id $MY_SECURITY_GROUP --protocol tcp --port 22 --cidr $MY_IP/32 --debug
bundle exec cap production deploy --trace
aws ec2 revoke-security-group-ingress --group-id $MY_SECURITY_GROUP --protocol tcp --port 22 --cidr $MY_IP/32