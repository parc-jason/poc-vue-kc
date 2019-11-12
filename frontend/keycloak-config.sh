#!/bin/sh

# Recreate config file
rm -rf ./keycloak-config.json
touch ./keycloak-config.json

first_kc_var=true

# Add assignment
echo "{" >> ./keycloak-config.json

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  if [ ${varname:0:10} = 'VUE_APP_KC' ]; then
    # Read value of current variable if exists as Environment variable
    value=$(printenv "$varname")
    # Otherwise use value from .env file
    [[ -z $value ]] && value=${varvalue}

    varname=$(printf '%s\n' "${varname//VUE_APP_KC_/}" | tr '[A-Z]' '[a-z]' | sed -E 's/_([a-z])/\U\1/g')
    if [ $first_kc_var = true ]; then
      # append variable and value
      echo "  \"$varname\": \"$value\"" >> ./keycloak-config.json
      first_kc_var=false
    else
      # append variable and value, lead with a comma
      echo "  ,\"$varname\": \"$value\"" >> ./keycloak-config.json
    fi
  fi
done < .env

echo "}" >> ./keycloak-config.json
