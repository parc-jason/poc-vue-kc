#!/bin/sh

# Recreate config file
rm -rf ./runtime-config.json
touch ./runtime-config.json

first_var=true

# Add assignment runtime-config.sh
echo "{" >> ./runtime-config.json

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printenv "$varname")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}

  varname=$(printf '%s\n' "${varname//VUE_APP_/}" | tr '[A-Z]' '[a-z]' | sed -E 's/_([a-z])/\U\1/g')
  if [ $first_var = true ]; then
    # append variable and value
    echo "  \"$varname\": \"$value\"" >> ./runtime-config.json
    first_var=false
  else
    # append variable and value, lead with a comma
    echo "  ,\"$varname\": \"$value\"" >> ./runtime-config.json
  fi
done < .env

echo "}" >> ./runtime-config.json
