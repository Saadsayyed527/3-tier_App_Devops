# base image
FROM node:18

# working directory
WORKDIR /app

# copy files
COPY package*.json ./
RUN npm install
COPY . .

# expose port
EXPOSE 5000

# run app
CMD ["npm", "start"]
