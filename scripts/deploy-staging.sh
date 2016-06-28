#!/bin/sh

set -ex

export AWS_DEFAULT_REGION="ap-us-west-1"

MY_SECURITY_GROUP=${AWS_SECURITY_GROUP_ID}
MY_IP=`curl -s ifconfig.me`

aws ec2 authorize-security-group-ingress --group-id $MY_SECURITY_GROUP --protocol tcp --port 22 --cidr $MY_IP/32 --debug
bundle exec cap staging deploy --trace
aws ec2 revoke-security-group-ingress --group-id $MY_SECURITY_GROUP --protocol tcp --port 22 --cidr $MY_IP/32