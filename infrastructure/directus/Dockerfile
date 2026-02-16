FROM directus/directus:11.4.0

USER root

# Install build deps for native module compilation, then install argon2
RUN apk add --no-cache python3 make g++ \
  && npm i --omit=dev argon2 \
  && apk del python3 make g++

USER node
