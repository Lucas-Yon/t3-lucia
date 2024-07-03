  #!/bin/bash

  #################################################################################
  # WARNING: You must use versions like "MAJOR.MINOR.PATCH" with digits only.
  # Pre-release and build metadata labels are not supported (contribs are welcome).
  #################################################################################

  #######################
  # FILL ME
  #######################
  DOCKERHUB_REPOSITORY=""
  #######################

  if [ -z "$DOCKERHUB_REPOSITORY" ]; then
    printf "Before using this script you need to edit line 8 and fill the value with your Dockerhub repository.\n"
    printf "Then put this script as 'publish.sh' alongside your Dockerfile.\n\n"
    exit 1
  fi

  if [ -z "$1" ] || [[ "$1" =~ ^(-h|--help)$ ]] || [[ ! "$1" =~ ^(major|minor|patch)$ ]]; then
    printf "Pass a release type to increment the version, build and push this image.\n"
    printf "Usage: ./publish.sh [major, minor, patch]\n\n"
    exit 0
  fi

  RELEASE_TYPE=$1

  # Fetch latest tag matching /^[0-9]+\.[0-9]+\.[0-9]+$/

  # Work only with public images 
  CURRENT_VER=$(wget -q https://registry.hub.docker.com/v1/repositories/$DOCKERHUB_REPOSITORY/tags -O -  | sed -e 's/[][]//g' -e 's/"//g' -e 's/ //g' | tr '}' '\n'  | awk -F: '{print $3}' | awk '/^[0-9]+\.[0-9]+\.[0-9]+$/{ print $0 }' | awk -F: 'END{print $0}')
#   CURRENT_VER=$(docker images --format "{{.Tag}}" --filter=reference="$DOCKERHUB_REPOSITORY" | grep -E '^[0-9]+\.[0-9]+\.[0-9]+$' | sort -rV | head -n 1)


  # Decompose the version string
  CURRENT_VER_ARR=(${CURRENT_VER//./ }) # Replaces dots with spaces then convert to array
  CURRENT_VER_MAJOR=${CURRENT_VER_ARR[0]}
  CURRENT_VER_MINOR=${CURRENT_VER_ARR[1]}
  CURRENT_VER_PATCH=${CURRENT_VER_ARR[2]}

  # Increment the version depending on the release type
  case $RELEASE_TYPE in
    major)
      NEW_VER_MAJOR=$((CURRENT_VER_MAJOR+1))
      NEW_VER_MINOR=0
      NEW_VER_PATCH=0
    ;;
    minor)
      NEW_VER_MAJOR=$CURRENT_VER_MAJOR
      NEW_VER_MINOR=$((CURRENT_VER_MINOR+1))
      NEW_VER_PATCH=0
    ;;
    patch)
      NEW_VER_MAJOR=$CURRENT_VER_MAJOR
      NEW_VER_MINOR=$CURRENT_VER_MINOR
      NEW_VER_PATCH=$((CURRENT_VER_PATCH+1))
    ;;
  esac

  # Compose the new version string
  NEW_VER="$NEW_VER_MAJOR.$NEW_VER_MINOR.$NEW_VER_PATCH"
  echo "Upgrading: $CURRENT_VER -> $NEW_VER"

  # Change directory to the one containing this script
  cd $(dirname $0)
  # Build the image
  docker build \
#   --build-arg NEXT_PUBLIC_S3_LINK="" \
  -t "$DOCKERHUB_REPOSITORY:$NEW_VER" .
  # # Push the image
  docker push "$DOCKERHUB_REPOSITORY:$NEW_VER"