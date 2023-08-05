###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18.16-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json .

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci && npm cache clean --force

# Bundle app source
COPY . .

CMD [ "npm", "run", "start:docker" ]
